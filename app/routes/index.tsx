import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request);
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative rounded-lg border border-gray-200 p-8 text-center">
        <code className="mt-4 block whitespace-normal break-words">
          {JSON.stringify(data)}
        </code>
      </div>
    </div>
  );
}
