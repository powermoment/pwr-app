import type { LinksFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import moodSliderStyles from "./MoodSlider.css";
import { getMoodColorByValue } from "~/helpers/colors";
import { getMoodLabelByValue } from "~/helpers/typos";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: moodSliderStyles }];
};

type MoodSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const MoodSlider = ({ value, onChange }: MoodSliderProps) => {
  const [color, setColor] = useState<string>(getMoodColorByValue(value));

  useEffect(() => {
    setColor(getMoodColorByValue(value));
  }, [onChange, value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.valueAsNumber);

  return (
    <div className="flex flex-col items-center space-y-6">
      <span>{getMoodLabelByValue(value)}</span>
      <div className="moodSlider" style={{ color }}>
        <input
          type="range"
          name="mood"
          min="0"
          max="6"
          step="1"
          value={value}
          onChange={handleChange}
          className="moodSlider__input"
        />
        <svg
          className="moodSlider__bar"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 254.73 17.01"
        >
          <path
            fill="currentColor"
            d="M3.08 6.66 244 0c14.34 0 14.34 17 0 17L3.08 11.28c-4.08 0-4.08-4.62 0-4.62Z"
            data-name="Слой 1-2"
          />
        </svg>
      </div>
    </div>
  );
};

export default MoodSlider;
