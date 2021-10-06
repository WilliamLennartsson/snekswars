import "./styles/main.css";
import SneksGame from "./game";
import { createHtmlComponent } from "./game/htmlUtils";

window.onload = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const container = createHtmlComponent({ width, height });
  document.body.appendChild(container);

  const { start } = SneksGame({ container });
  start();
};
