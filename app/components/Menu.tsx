import { Link } from "@remix-run/react";
import React from "react";

type MenuItem = {
  id: string;
  name: string;
};

type MenuProps = {
  currentId?: string;
  items: MenuItem[];
  onChange?: (name: string) => void;
};

const Menu = ({ currentId, items, onChange }: MenuProps) => {
  const className =
    "block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 text-right";
  const activeClassName =
    "block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg text-right";

  const handleItemClick = (name: string) => () => {
    onChange && onChange(name);
  };

  return (
    <div className="md:w-80">
      <nav className="flex flex-col space-y-1 mb-6 md:px-6">
        <div className="ml-auto mb-2 mr-6 flex items-center space-x-4 hover:space-x-1">
          <Link
            to="/reasons/create"
            className="z-10 block rounded-full border-2 border-white bg-pwr p-3 text-black transition-all hover:scale-110 focus:outline-none focus:ring active:bg-green-50"
            type="button"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Link>
        </div>
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            className={currentId === item.id ? activeClassName : className}
            onClick={handleItemClick(item.id)}
          >
            <span className="mx-4 text-lg font-normal">{item.name}</span>
            <span className="flex-grow text-right"></span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Menu;
