import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { AuthenticatedUser } from "~/remix-app";
import Avatar from "./Avatar";
import { Link } from "@remix-run/react";

type Props = {
  user?: AuthenticatedUser;
};

const Info = ({ user }: { user?: AuthenticatedUser }) => (
  <p className="ml-2 hidden text-left text-xs md:block">
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
        className="group relative shrink-0 items-center rounded-lg transition md:hidden"
      >
        <Menu.Button className="group flex shrink-0 items-center rounded-lg transition">
          <Avatar user={user} />
          <Info user={user} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 h-5 w-5 text-gray-500 transition group-hover:text-gray-700"
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
          <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="divide-y divide-dashed">
              <Menu.Item>
                <p className="ml-1 block p-3 text-left text-xs">
                  <strong className="block font-medium">
                    {user?.data?.username}
                  </strong>

                  <span className="text-gray-500">{user?.data?.email}</span>
                </p>
              </Menu.Item>
              <Menu.Item>
                <Link
                  to="/logout"
                  className="ml-1 text-red-400 flex p-3 text-left align-middle text-xs"
                >
                  Logout
                </Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </React.Fragment>
  );
};

export default UserProfile;
