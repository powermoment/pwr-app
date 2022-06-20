import React from "react";
import { ReactSVG } from "react-svg";

type PWRSloganProps = {
  className?: string;
};

const PWRSlogan = ({ className }: PWRSloganProps) => {
  return (
    <ReactSVG
      className={className}
      beforeInjection={(svg) => {
        svg.setAttribute("style", "width: 100%");
      }}
      src={`/assets/svgs/slogan.svg`}
    />
  );
};

export default PWRSlogan;
