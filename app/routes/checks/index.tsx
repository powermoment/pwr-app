import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Last7Days } from "~/components/chars/Last7Days";
import type { Check } from "~/remix-app";
import { authenticator } from "~/services/auth.server";
import { supabase } from "~/services/supabase.server";

// TODO: Fix load user data after login redirect
export const loader: LoaderFunction = async ({ request }) => {
  // TODO: Move to role helpers
  const user = await authenticator.isAuthenticated(request);
  if (!user?.data) return redirect("/");

  const { body, error } = await supabase
    .from<Check>("checks")
    .select()
    .eq("user_id", user?.data?.id);

  // TODO: Show empty state or error
  if (error) return json({ error: true });

  return json({ checks: body });
};

const Checks = () => {
  const { checks } = useLoaderData<{ checks: Check[] }>();

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex h-screen min-h-full flex-col rounded-lg border border-gray-200 p-8">
        <div className="flex-auto">
          <Last7Days checks={checks} />
        </div>
      </div>
    </div>
  );
};

export default Checks;
