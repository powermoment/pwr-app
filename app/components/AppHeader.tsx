import type { PropsWithChildren, ReactElement } from "react";
import { Link } from "react-router-dom";
import React from "react";
import type { AuthenticatedUser } from "~/remix-app";
import UserProfile from "./UserProfile";

type AppHeaderProps = {
  user?: AuthenticatedUser;
};

const AppHeader = ({
  user,
}: PropsWithChildren<AppHeaderProps>): ReactElement => {
  return (
    <React.Fragment>
      <header className="bg-gray-50">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center sm:justify-between sm:gap-4">
            <div className="flex items-center justify-between flex-1 gap-8 sm:justify-end">
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="block p-2.5 text-gray-600 bg-white rounded-lg hover:text-gray-700 shrink-0 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>

                {user?.data ? (
                  <Link
                    to="/logout"
                    className="block p-2.5 text-gray-600 bg-white rounded-lg hover:text-gray-700 shrink-0 shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="block p-2.5 text-gray-600 bg-white rounded-lg hover:text-gray-700 shrink-0 shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </Link>
                )}
              </div>

              <UserProfile user={user} />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default AppHeader;
