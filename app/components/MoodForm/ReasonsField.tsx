import React from "react";

const ReasonsField = () => {
  return (
    <div className="rounded-lg border border-gray-200 p-6 text-center">
      <strong className="rounded-full border border-red-500 bg-red-100 px-5 py-1.5 text-[10px] uppercase tracking-wide text-red-500">
        Bug
      </strong>
      <div className="flex">
        <button
          type="submit"
          className="group relative inline-block w-full text-sm font-medium text-pwr focus:outline-none focus:ring active:text-pwr"
        >
          <span className="absolute inset-0 translate-x-0 translate-y-0 bg-pwr transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"></span>
          <span className="relative block border border-current bg-white px-8 py-3 text-pwr">
            Оценить
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReasonsField;
