import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useMemo, useState } from "react";
import Menu from "~/components/Menu";
import { authenticator } from "~/services/auth.server";
import { supabase } from "~/services/supabase.server";

type Reason = { id: string; name: string };

// TODO: Handle supabase error
export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (user === null || user.data.role !== "admin") {
    return redirect("/");
  }

  return supabase.from("reasons").select();
};

const Reasons = () => {
  const { body } = useLoaderData<{ body: Reason[] }>();
  const [current, setCurrent] = useState<string>(body[0].name);

  const items = useMemo(
    () => body.map((item) => ({ name: item.name, value: item.name })),
    [body]
  );

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col px-4 py-8 sm:px-6 md:flex-row lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <Menu current={current} items={items} onChange={setCurrent}></Menu>
      </div>
      <div className="grow rounded-lg border border-gray-200 p-8 text-center">
        content: {current}
      </div>
    </div>
  );
};

export default Reasons;
