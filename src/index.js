import "./styles/main.css";
import SneksGame from "./game";
import { createHtmlComponent } from "./game/htmlUtils";

window.onload = () => {
  const width = window.innerWidth * 0.7;
  const height = window.innerHeight * 0.7;

  const container = createHtmlComponent({ width, height });
  document.body.appendChild(container);

  const { start } = SneksGame({ container });
  const stop = start();
  // TODO. fix onabort etc to handle stop
};
