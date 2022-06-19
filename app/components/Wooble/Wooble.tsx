import type { LinksFunction } from "@remix-run/node";

import woobleStyles from "./Wooble.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: woobleStyles }];
};

type WoobleProps = {
  color: string;
};

// Original code by @jasesmith
// https://codepen.io/jasesmith/pen/qqgvZe
const Wooble = ({ color }: WoobleProps) => {
  return (
    <div className="wooble" style={{ color }}>
      <div className="wooble__spark"></div>
      <div className="wooble__spark"></div>
      <div className="wooble__spark"></div>
      <div className="wooble__spark"></div>
      <div className="wooble__spark"></div>
    </div>
  );
};

export default Wooble;
