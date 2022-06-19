import type { LinksFunction } from "@remix-run/node";
import MoodSlider, {
  links as moodSliderLinks,
} from "~/components/MoodSlider/MoodSlider";
import Wooble, { links as woobleStyles } from "~/components/Wooble/Wooble";

export const links: LinksFunction = () => {
  return [...moodSliderLinks(), ...woobleStyles()];
};

const MoodForm = () => {
  return (
    <div className="flex flex-col space-y-8">
      <Wooble />
      <MoodSlider />
    </div>
  );
};

export default MoodForm;
