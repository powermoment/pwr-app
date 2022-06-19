import React from "react";
import { Link } from "react-router-dom";
import type { AuthenticatedUser } from "~/remix-app";
import { ViewBoardsIcon } from "@heroicons/react/solid";

type HeaderMenuProps = {
  user?: AuthenticatedUser;
};

const HeaderMenu = ({ user }: HeaderMenuProps) => {
  return (
    <div className="flex gap-4">
      {user?.data && (
        <Link
          className="group relative inline-block focus:outline-none focus:ring"
          to="/checks/create"
        >
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-pwr  transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative inline-block border-2 border-current px-3 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
            Check!
          </span>
        </Link>
      )}

      {user?.data && (
        <Link
          to="/checks"
          className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
        >
          <ViewBoardsIcon className="h-5 w-5" />
        </Link>
      )}

      <Link
        to="/"
        className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
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
    </div>
  );
};

export default HeaderMenu;
