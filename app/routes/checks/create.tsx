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
import type { Reason } from "~/remix-app";
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

const CreateCheck = () => {
  const data = useActionData();
  const { state } = useTransition();

  useToastTransition(data?.message);

  return <MoodForm disabled={state === "loading" || state === "submitting"} />;
};

export default CreateCheck;
