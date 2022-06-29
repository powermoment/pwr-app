import type { LinksFunction } from "@remix-run/node";
import { useMemo, useState } from "react";
import MoodSlider, {
  links as moodSliderLinks,
} from "~/components/MoodSlider/MoodSlider";
import Wooble, { links as woobleStyles } from "~/components/Wooble/Wooble";
import { getMoodColorByValue } from "~/helpers/colors";

export const links: LinksFunction = () => {
  return [...moodSliderLinks(), ...woobleStyles()];
};

type MoodFieldProps = {
  onSubmit: (value: number) => void;
};

const DEFAULT_VALIE = 3;

const MoodField = ({ onSubmit }: MoodFieldProps) => {
  const [moodValue, setMoodValue] = useState<number>(DEFAULT_VALIE);
  const color = useMemo(() => getMoodColorByValue(moodValue), [moodValue]);

  const handleMoodChange = (value: number) => setMoodValue(value);
  const handleSubmit = () => onSubmit(moodValue);

  return (
    <div className="flex flex-col space-y-16">
      <Wooble color={color} />
      <MoodSlider value={moodValue} onChange={handleMoodChange} />
      <div className="flex">
        <button
          type="button"
          onClick={handleSubmit}
          className="group relative inline-block w-full text-sm font-medium text-pwr transition-all duration-500 focus:outline-none focus:ring active:text-pwr"
        >
          <span
            style={{
              borderColor: color,
              background: color,
            }}
            className="absolute inset-0 translate-x-0 translate-y-0 bg-pwr transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"
          ></span>
          <span
            style={{ borderColor: color, color }}
            className="relative block border-2 border-current bg-white px-8 py-2 text-pwr"
          >
            Оценить
          </span>
        </button>
      </div>
    </div>
  );
};

export default MoodField;
