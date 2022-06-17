import type { PropsWithChildren, ReactElement } from "react";
import React from "react";
import type { AuthenticatedUser } from "~/remix-app";
import UserProfile from "./UserProfile";
import HeaderMenu from "./HeaderMenu";

type AppHeaderProps = {
  user?: AuthenticatedUser;
};

const AppHeader = ({
  user,
}: PropsWithChildren<AppHeaderProps>): ReactElement => {
  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
            <HeaderMenu user={user} />
            <UserProfile user={user} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
