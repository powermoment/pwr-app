import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import PWRLogo from "~/components/PWRLogo";
import PWRSlogan from "~/components/PWRSlogan";
import UnDraw from "~/components/UnDraw";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (user) return redirect("/checks", 302);
  return null;
};

const Index = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative rounded-lg border border-gray-200 p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-col space-y-4">
            <div className="block">
              <PWRLogo />
              <PWRSlogan className="w-48 opacity-80" />
            </div>
            <div>
              <Link
                className="group relative inline-block focus:outline-none focus:ring"
                to="/login"
              >
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-pwr transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  Join Free
                </span>
              </Link>
            </div>
          </div>
          <div className="-mx-4 mt-24 ml-auto -mb-8 w-56 opacity-50">
            <UnDraw name="join" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
