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
    "my-6 flex items-center rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800  dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white";
  const activeClassName =
    "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-lg bg-gray-100 dark:bg-gray-600";

  const handleItemClick = (name: string) => () => {
    onChange && onChange(name);
  };

  return (
    <div className="w-72 md:h-screen">
      <nav className="mb-10 md:mb-0 md:px-6 ">
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
