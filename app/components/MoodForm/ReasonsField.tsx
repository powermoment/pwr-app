import { useLoaderData } from "@remix-run/react";
import ReasonsSelect from "../ReasonsSelect";

const ReasonsField = () => {
  const { reasons } = useLoaderData();

  return (
    <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 p-6">
      <span className="text-lg text-gray-600">
        Какие события были?
      </span>
      <div className="flex flex-wrap gap-4">
        <ReasonsSelect reasons={reasons} />
      </div>
      <div className="flex">
        <button
          type="submit"
          className="group relative inline-block w-full text-sm font-medium text-pwr focus:outline-none focus:ring active:text-pwr"
        >
          <span className="absolute inset-0 translate-x-0 translate-y-0 bg-pwr transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"></span>
          <span className="relative flex justify-center border-2 border-current bg-white px-8 py-3 text-pwr">
            Отправить
            <svg
              className="ml-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReasonsField;
