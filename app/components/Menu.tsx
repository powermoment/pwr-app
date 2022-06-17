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
    <div className="w-80">
      <nav className="flex flex-col space-y-1 px-6">
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
