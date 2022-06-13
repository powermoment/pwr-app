import type { PropsWithChildren, ReactElement } from "react";
import type { User } from "@supabase/supabase-js";
import AppHeader from "./AppHeader";

type AppLayoutProps = {
  user?: { data: User };
};

const AppLayout = ({
  user,
  children,
}: PropsWithChildren<AppLayoutProps>): ReactElement => {
  return (
    <>
      <div className="header">
        <AppHeader user={user?.data} />
      </div>
      <div className="container mx-auto">{children}</div>
    </>
  );
};

export default AppLayout;
