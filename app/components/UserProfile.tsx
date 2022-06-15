import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import type { AuthenticatedUser } from "~/remix-app";

type Props = {
  user?: AuthenticatedUser;
};

const Avatar = ({ user }: { user?: AuthenticatedUser }) =>
  user?.data?.avatar_url ? (
    <img
      className="object-cover w-10 h-10 rounded-full"
      src={user?.data?.avatar_url}
      alt={user?.data?.username || "User avatar"}
    />
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-gray-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clipRule="evenodd"
      />
    </svg>
  );

const Info = ({ user }: { user?: AuthenticatedUser }) => (
  <p className="hidden ml-2 text-xs text-left md:block">
    <strong className="block font-medium">{user?.data?.username}</strong>

    <span className="text-gray-500">{user?.data?.email}</span>
  </p>
);

const UserProfile = ({ user }: Props) => {
  return (
    <React.Fragment>
      <div className="hidden md:flex">
        <Avatar user={user} />
        <Info user={user} />
      </div>
      <Menu
        as="div"
        className="z-1 relative md:hidden items-center transition rounded-lg group shrink-0"
      >
        <Menu.Button className="flex items-center transition rounded-lg group shrink-0">
          <Avatar user={user} />
          <Info user={user} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-4 text-gray-500 transition group-hover:text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <p className="block p-2 ml-2 text-xs text-left">
                  <strong className="block font-medium">
                    {user?.data?.username}
                  </strong>

                  <span className="text-gray-500">{user?.data?.email}</span>
                </p>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </React.Fragment>
  );
};

export default UserProfile;
