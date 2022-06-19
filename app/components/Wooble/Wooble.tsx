import type { LinksFunction } from "@remix-run/node";

import woobleStyles from "./Wooble.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: woobleStyles }];
};

// Original code by @jasesmith
// https://codepen.io/jasesmith/pen/qqgvZe
const Wooble = () => {
  return (
    <div className="wooble">
      <div className="wooble__spark"></div>
      <div className="wooble__spark"></div>
      <div className="wooble__spark"></div>
      <div className="wooble__spark"></div>
      <div className="wooble__spark"></div>
    </div>
  );
};

export default Wooble;
