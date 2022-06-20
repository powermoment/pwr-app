import React from "react";
import { ReactSVG } from "react-svg";

type UnDrawProps = {
  name: string;
  className?: string;
};

const UnDraw = ({ name, className }: UnDrawProps) => {
  return (
    <ReactSVG
      className={`${className || ""} text-pwr`}
      beforeInjection={(svg) => {
        svg.setAttribute("style", "width: 100%; height: 100%");
      }}
      src={`/assets/undraw/${name}.svg`}
    />
  );
};

export default UnDraw;
