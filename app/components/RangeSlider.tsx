import React from "react";

const RATES = [
  { value: 1, emojt: "💩" },
  { value: 2, emojt: "🤮" },
  { value: 3, emojt: "😷" },
  { value: 4, emojt: "🥴" },
  { value: 5, emojt: "🙂" },
  { value: 6, emojt: "😀" },
  { value: 7, emojt: "😁" },
  { value: 8, emojt: "🤤" },
  { value: 9, emojt: "🥰" },
  { value: 10, emojt: "😍" },
].reverse();

type RangeSliderProps = {};

// eslint-disable-next-line no-empty-pattern
const RangeSlider = ({}: RangeSliderProps) => {
  return (
    <div className="row flex space-x-2 overflow-scroll">
      {RATES.map((rate) => (
        <button
          key={rate.value}
          className="group relative inline-block w-16 font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          <span className="absolute inset-0 translate-x-0 translate-y-0 bg-indigo-600 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"></span>
          <span className="relative hidden border border-current bg-white w-16 py-2 text-xl md:text-2xl group-hover:block group-hover:opacity-100">
            {rate.emojt}
          </span>
          <span className="relative block border border-current bg-white w-16 py-3 text-l md:text-xl group-hover:hidden group-hover:opacity-0">
            {rate.value}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RangeSlider;
