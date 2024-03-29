import { Transition } from "@headlessui/react";
import type { LinksFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import MoodField, { links as moodFieldLinks } from "./MoodField";
import ReasonsField from "./ReasonsField";

export const links: LinksFunction = () => {
  return [...moodFieldLinks()];
};

type MoodFormProps = {
  disabled?: boolean;
};

const MoodForm = ({ disabled }: MoodFormProps) => {
  const [showReasons, setShowReasons] = useState<boolean>(false);
  const handleMoodSubmit = () => setShowReasons(true);

  return (
    <div
      className={`${
        disabled ? "pointer-events-none animate-pulse" : ""
      } transition-margin duration-250 flex items-center justify-center transition-all`}
    >
      <Form
        method="post"
        className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8"
      >
        <Transition
          show={showReasons}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <ReasonsField />
        </Transition>
        <div className="relative rounded-lg border border-gray-200 p-6">
          <MoodField onSubmit={handleMoodSubmit} />
        </div>
      </Form>
    </div>
  );
};

export default MoodForm;
