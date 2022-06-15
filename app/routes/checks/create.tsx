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
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="relative p-8 text-center border border-gray-200 rounded-lg">
        <Form method="post" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded"
              id="title"
              type="title"
            />
          </div>
          <div className="relative">
            <label className="sr-only" htmlFor="body">
              Body
            </label>
            <textarea
              className="w-full p-3 text-sm border-gray-200 rounded-lg"
              placeholder="Body"
              rows={8}
              id="body"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default checks;
