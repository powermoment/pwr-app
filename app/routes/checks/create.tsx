import type { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { supabase } from "~/services/supabase.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");

  const user = await authenticator.isAuthenticated(request);

  const { data, error } = await supabase
    .from("checks")
    .insert({ title, body, author: user?.data?.id });

  console.log(data, error);

  return null;
};

const checks = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative rounded-lg border border-gray-200 p-8 text-center">
        <Form method="post" className="mx-auto mt-8 mb-0 max-w-md space-y-4">
          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="mt-1 w-full rounded border-2 border-gray-200 p-3 text-sm"
              id="title"
              type="title"
            />
          </div>
          <div className="relative">
            <label className="sr-only" htmlFor="body">
              Body
            </label>
            <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Body"
              rows={8}
              id="body"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default checks;
