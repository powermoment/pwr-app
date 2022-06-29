import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useTransition } from "@remix-run/react";
import MoodForm, {
  links as moodFormLinks,
} from "~/components/MoodForm/MoodForm";
import { useToastTransition } from "~/hooks/useToastTransition";
import type { Breadcrumb, Reason } from "~/remix-app";
import { authenticator } from "~/services/auth.server";
import { supabase } from "~/services/supabase.server";

export const links: LinksFunction = () => {
  return [...moodFormLinks()];
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const form = await request.formData();
  const mood = form.get("mood");
  const reasons_ids = [...form.getAll("reasons")];

  const { error } = await supabase
    .from("checks")
    .insert({ value: mood, reasons_ids, user_id: user?.data?.id });

  if (error) {
    return json({ message: error.message });
  }

  return redirect("/checks");
};

export const loader: LoaderFunction = async ({ request }) => {
  // TODO: Move to role helpers
  const user = await authenticator.isAuthenticated(request);
  if (!user?.data) return redirect("/");

  const { body, error } = await supabase.from<Reason>("reasons").select();

  // TODO: Show empty state or error
  if (error) return json({ error: true });

  return json({ reasons: body });
};

export const handle = {
  breadcrumb: (): Breadcrumb[] => [
    { title: "Checks", to: "/checks" },
    { title: "Create", to: "/checks/create" },
  ],
};

const CreateCheck = () => {
  const data = useActionData();
  const { state } = useTransition();

  useToastTransition(data?.message);

  return (
    <>
      <div className="mb-8 w-full px-4 md:px-6">
        <h5 className="text-lg font-bold text-gray-600">
          Rate Your Productivity
          <br />
          at
        </h5>
        <h4 className="text-3xl font-bold text-gray-700">22:11</h4>
      </div>
      <MoodForm disabled={state === "loading" || state === "submitting"} />
    </>
  );
};

export default CreateCheck;
