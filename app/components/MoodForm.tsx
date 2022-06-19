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

const MoodForm = () => {
  const [moodValue, setMoodValue] = useState<string>();
  const handleMoodChange = (value: string) => setMoodValue(value);

  return (
    <div className="flex flex-col space-y-8">
      <Wooble color={getMoodColorByValue(moodValue)} />
      <MoodSlider onChange={handleMoodChange} />
    </div>
  );
};

export default MoodForm;
