import React from "react";

type MenuItem = {
  name: string;
  value: string;
};

type MenuProps = {
  current: string;
  items: MenuItem[];
  onChange?: (name: string) => void;
};

const Menu = ({ current, items, onChange }: MenuProps) => {
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
          <button
            key={item.name}
            className={current === item.name ? activeClassName : className}
            onClick={handleItemClick(item.name)}
          >
            <span className="mx-4 text-lg font-normal">{item.value}</span>
            <span className="flex-grow text-right"></span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Menu;
