import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import Menu from "~/components/Menu";
import type { Reason } from "~/remix-app";
import { authenticator } from "~/services/auth.server";
import { supabase } from "~/services/supabase.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  // TODO: Move to role helpers
  const user = await authenticator.isAuthenticated(request);

  if (user === null || user.data.role !== "admin") {
    return redirect("/");
  }

  const { body, error } = await supabase.from<Reason>("reasons").select();

  // TODO: Show empty state or error
  if (error) return json({ error: true });

  return json(body);
};

const Reasons = () => {
  const reasons = useLoaderData<Reason[]>();
  const [currentId, setCurrentId] = useState<string>();

  const items = useMemo(
    () => reasons.map((item) => ({ id: item.id, name: item.name })),
    [reasons]
  );

  return (
    <div className="mx-auto flex flex-col px-4 py-8 sm:px-6 md:flex-row lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <Menu
          currentId={currentId}
          items={items}
          onChange={setCurrentId}
        ></Menu>
      </div>
      <div className="grow rounded-lg border border-gray-200 p-8 text-center">
        <Outlet context={{ reasons }} />
      </div>
    </div>
  );
};

export default Reasons;
