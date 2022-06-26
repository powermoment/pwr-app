import { Link } from "@remix-run/react";
import React from "react";
import UnDraw from "../UnDraw";

const Empty = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center p-6 md:p-12">
        <div className="w-12/12 md:w-6/12 ">
          <UnDraw name="growing" />
        </div>
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No checks</h3>
      <p className="mt-1 text-sm text-gray-500">
        Please, fill at least one check for see productivity charts.
      </p>
      <div className="mt-6">
        <Link
          to="/checks/create"
          className="inline-flex items-center rounded-md border border-transparent bg-pwr px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pwr/90 focus:outline-none focus:ring-2 focus:ring-pwr/50 focus:ring-offset-2"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Check
        </Link>
      </div>
    </div>
  );
};

export default Empty;
