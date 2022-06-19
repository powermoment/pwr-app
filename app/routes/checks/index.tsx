import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Check } from "~/remix-app";
import { supabase } from "~/services/supabase.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { body, error } = await supabase.from<Check>("checks").select();

  // TODO: Show empty state or error
  if (error) return json({ error: true });

  return json({ checks: body });
};

const Checks = () => {
  const data = useLoaderData();

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-medium">There's nothing here...</h2>
        <p className="mt-4 text-sm text-gray-500">
          Created checkouts will appear here, try creating one!
        </p>
        {JSON.stringify(data)}
      </div>
    </div>
  );
};

export default Checks;
