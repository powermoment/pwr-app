import React from "react";
import { ReactSVG } from "react-svg";

type PWRLogoProps = {
  className?: string;
};

const PWRLogo = ({ className }: PWRLogoProps) => {
  return (
    <ReactSVG
      className={className}
      beforeInjection={(svg) => {
        svg.setAttribute("style", "width: 100%");
      }}
      src={`/assets/svgs/logo.svg`}
    />
  );
};

export default PWRLogo;
