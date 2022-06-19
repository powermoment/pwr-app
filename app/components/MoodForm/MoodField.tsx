import type { LinksFunction } from "@remix-run/node";
import { useState } from "react";
import MoodSlider, {
  getMoodColorByValue,
  links as moodSliderLinks,
} from "~/components/MoodSlider/MoodSlider";
import Wooble, { links as woobleStyles } from "~/components/Wooble/Wooble";

export const links: LinksFunction = () => {
  return [...moodSliderLinks(), ...woobleStyles()];
};

type MoodFieldProps = {
  onSubmit: (value: string) => void;
};

const DEFAULT_VALIE = "3";

const MoodField = ({ onSubmit }: MoodFieldProps) => {
  const [moodValue, setMoodValue] = useState<string>(DEFAULT_VALIE);

  const handleMoodChange = (value: string) => setMoodValue(value);
  const handleSubmit = () => onSubmit(moodValue);

  return (
    <div className="flex flex-col space-y-16">
      <Wooble color={getMoodColorByValue(moodValue)} />
      <MoodSlider value={moodValue} onChange={handleMoodChange} />
      <div className="flex">
        <button
          type="button"
          onClick={handleSubmit}
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

export default MoodField;
