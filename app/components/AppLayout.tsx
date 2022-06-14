import type { PropsWithChildren, ReactElement } from "react";
import AppHeader from "./AppHeader";
import type { AuthenticatedUser } from "~/remix-app";

type AppLayoutProps = {
  user?: AuthenticatedUser;
};

const AppLayout = ({
  user,
  children,
}: PropsWithChildren<AppLayoutProps>): ReactElement => {
  return (
    <>
      <AppHeader user={user} />
      <div className="container mx-auto">{children}</div>
    </>
  );
};

export default AppLayout;
