import { ChevronRightIcon, HomeIcon } from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import React, { useMemo } from "react";
import type { Breadcrumb } from "~/remix-app";

type BreadcrumbsProps = {
  items?: Breadcrumb[];
};

const Breadcrumbs = ({ items = [] }: BreadcrumbsProps) => {
  const breadcrumbs = useMemo(
    () =>
      items.map((item) =>
        typeof item === "string" ? { title: item, to: null } : item
      ),
    [items]
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className="space-y-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      <ol className="flex items-center space-x-1 text-sm text-gray-500">
        <li>
          <Link className="block transition-colors hover:text-gray-700" to="/">
            <span className="sr-only"> Home </span>
            <HomeIcon className="h-4 w-4" />
          </Link>
        </li>

        {breadcrumbs.map((breadcrumb) => (
          <React.Fragment key={breadcrumb.title}>
            <li>
              <ChevronRightIcon className="h-4 w-4" />
            </li>
            <li>
              {breadcrumb.to ? (
                <Link
                  className="block transition-colors hover:text-gray-700"
                  to={breadcrumb.to}
                >
                  {breadcrumb.title}
                </Link>
              ) : (
                <span className="block transition-colors hover:text-gray-700">
                  {breadcrumb.title}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
