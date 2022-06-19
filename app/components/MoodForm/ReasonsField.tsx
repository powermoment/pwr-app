import { useLoaderData } from "@remix-run/react";
import ReasonsSelect from "../ReasonsSelect";

const ReasonsField = () => {
  const { reasons } = useLoaderData();

  return (
    <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 p-6 text-center">
      <div className="flex flex-wrap gap-4">
        <ReasonsSelect reasons={reasons} />
      </div>
      <div className="flex">
        <button
          type="submit"
          className="group relative inline-block w-full text-sm font-medium text-pwr focus:outline-none focus:ring active:text-pwr"
        >
          <span className="absolute inset-0 translate-x-0 translate-y-0 bg-pwr transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"></span>
          <span className="relative block border border-current bg-white px-8 py-3 text-pwr">
            Отправить
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReasonsField;
