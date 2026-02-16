import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-XC02YVDDXS");
};

export const trackPage = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};
