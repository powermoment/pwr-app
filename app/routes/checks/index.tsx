import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import subDays from "date-fns/subDays";
import { useMemo } from "react";
import Empty from "~/components/chars/Empty";
import { Last7Days } from "~/components/chars/Last7Days";
import SingleDay from "~/components/chars/SingleDay";
import Tabs from "~/components/Tabs";
import { getChecksByDay } from "~/helpers/checks";
import type { Check } from "~/remix-app";
import { authenticator } from "~/services/auth.server";
import { supabase } from "~/services/supabase.server";

// TODO: Fix load user data after login redirect
export const loader: LoaderFunction = async ({ request }) => {
  // TODO: Move to role helpers
  const user = await authenticator.isAuthenticated(request);
  if (!user?.data) return redirect("/");

  const { body, error } = await supabase
    .from<Check>("checks")
    .select()
    .eq("user_id", user?.data?.id);

  // TODO: Show empty state or error
  if (error) return json({ error: true });

  return json({ checks: body });
};

const Checks = () => {
  const { checks } = useLoaderData<{ checks: Check[] }>();

  const todayChecks = useMemo(
    () => getChecksByDay(checks, new Date()),
    [checks]
  );

  const yesterdayChecks = useMemo(
    () => getChecksByDay(checks, subDays(new Date(), 1)),
    [checks]
  );

  const tabs = useMemo(
    () => [
      {
        id: "today",
        name: "Today",
        render: () => (
          <div className="flex h-screen min-h-full">
            <div className="flex-auto">
              {todayChecks.length ? (
                <SingleDay checks={todayChecks} />
              ) : (
                <Empty />
              )}
            </div>
          </div>
        ),
      },
      {
        id: "yesterday",
        name: "Yesterday",
        render: () => (
          <div className="flex h-screen min-h-full">
            <div className="flex-auto">
              {yesterdayChecks.length ? (
                <SingleDay checks={yesterdayChecks} />
              ) : (
                <Empty />
              )}
            </div>
          </div>
        ),
      },
      {
        id: "last7Days",
        name: "Last 7 Days",
        render: () => (
          <div className="flex h-screen min-h-full">
            <div className="flex-auto">
              <Last7Days checks={checks} />
            </div>
          </div>
        ),
      },
    ],
    [todayChecks, yesterdayChecks, checks]
  );

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-gray-200 p-8">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default Checks;
