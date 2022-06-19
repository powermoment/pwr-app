import type { LinksFunction } from "@remix-run/node";
import { useState } from "react";
import type { ChangeEvent } from "react";

import moodSliderStyles from "./MoodSlider.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: moodSliderStyles }];
};

// Palette from Ant.d
// https://ant.design/docs/spec/colors
const getColorByValue = (value: string) => {
  switch (value) {
    case "0":
      return "#9254de";
    case "1":
      return "#f759ab";
    case "2":
      return "#ff4d4f";
    case "3":
      // PowerMoment primary color
      return "#E6C37D";
    case "4":
      return "#40a9ff";
    case "5":
      return "#36cfc9";
    case "6":
      return "#73d13d";
    default:
      // Like at 0 value
      return "#9254de";
  }
};

const getLabelByValue = (value: string) => {
  switch (value) {
    case "0":
      return "Ужасное";
    case "1":
      return "Плохое";
    case "2":
      return "Не очень";
    case "3":
      return "Нормальное";
    case "4":
      return "Хорошее";
    case "5":
      return "Отличное";
    case "6":
      return "Прекрасное";
    default:
      return "Не удалось определить";
  }
};

const MoodSlider = () => {
  const defaultValue = "3";

  const [value, setValue] = useState<string>(defaultValue);
  const [color, setColor] = useState<string>(getColorByValue(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setColor(getColorByValue(e.target.value));
  };

  return (
    <div className="flex flex-col space-y-2">
      <span className="mr-auto">{getLabelByValue(value)}</span>
      <div className="moodSlider" style={{ color }}>
        <input
          type="range"
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
          viewBox="0 0 254.7 10.42"
        >
          <g fill="currentColor">
            <path d="M3.11 4.08 244 0c14.34 0 14.34 10.42 0 10.42L3.11 6.91c-4.11 0-4.11-2.83 0-2.83Z" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default MoodSlider;
