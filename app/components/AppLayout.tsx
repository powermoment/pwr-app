import type { PropsWithChildren, ReactElement} from "react";
import { useMemo } from "react";
import AppHeader from "./AppHeader";
import type { AuthenticatedUser } from "~/remix-app";
import Breadcrumbs from "./Breadcrumbs";
import { useMatches } from "@remix-run/react";

type AppLayoutProps = {
  user?: AuthenticatedUser;
};

const AppLayout = ({
  user,
  children,
}: PropsWithChildren<AppLayoutProps>): ReactElement => {
  const matches = useMatches();
  const breadcrumbs = useMemo(
    () =>
      matches
        .filter((match) => match.handle && match.handle.breadcrumb)
        .map((match, index) => match.handle.breadcrumb(match))
        // TODO: Hmm, look like nested routes can be in breadcrumbs
        .reduce((acc, curr) => [...acc, ...curr], []),
    [matches]
  );

  return (
    <>
      <AppHeader user={user} />
      <div className="container mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        {children}
      </div>
    </>
  );
};

export default AppLayout;
