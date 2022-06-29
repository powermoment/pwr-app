import { useState } from "react";
import { Tab } from "@headlessui/react";

type TabsProps = {
  tabs: {
    id: string;
    name: string;
    render: () => void;
  }[];
};

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Tabs = ({ tabs }: TabsProps) => {
  const [categories] = useState(tabs);

  return (
    <div className="w-full sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-pwr/40 p-1">
          {categories.map((category) => (
            <Tab
              key={category.id}
              className={({ selected }: { selected: boolean }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-pwr focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-black-400 hover:text-black/85 hover:bg-white/[0.8]"
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-8 md:mt-12">
          {categories.map((category) => (
            <Tab.Panel
              key={category.id}
              className={classNames(
                "rounded-xl bg-white p-0 md:p-4",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-pwr/40 focus:outline-none focus:ring-2"
              )}
            >
              {category.render()}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
