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
    <div className="card w-96 bg-base-100 shadow-xl">
      <Form method="post">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <textarea className="textarea" placeholder="Body"></textarea>
        <button>Send check</button>
      </Form>
    </div>
  );
};

export default checks;
