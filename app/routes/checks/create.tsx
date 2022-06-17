import type { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import RangeSlider from "~/components/RangeSlider";
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

const CreateCheck = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative rounded-lg border border-gray-200 p-4 text-center">
        <RangeSlider />
        <Form method="post" className="mx-auto mt-8 mb-0 max-w-md space-y-4">
          
        </Form>
      </div>
    </div>
  );
};

export default CreateCheck;
