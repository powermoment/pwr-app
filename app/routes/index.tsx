import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request);
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="relative p-8 text-center border border-gray-200 rounded-lg">
        <code className="mt-4 block break-words whitespace-normal">
          {JSON.stringify(data)}
        </code>
      </div>
    </div>
  );
}
