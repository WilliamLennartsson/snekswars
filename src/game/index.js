import { createGame } from "./game";
import { createHtmlComponent } from "./htmlUtils";

const SneksGame = (props) => {
  const { container } = props;

  const convertPxToNumber = (val) => {
    try {
      return Number(val.replace("px", ""))
    } catch (error) {
      console.log(`Error converting ${val}px to number`)
      return 0
    }
  }
  let width =  convertPxToNumber(container.style.width)
  let height = convertPxToNumber(container.style.height)

  console.log(`width, height`, width, height);
  const canvas = createHtmlComponent({ type: "canvas", width, height });
  container.appendChild(canvas);

  const start = () => {
    if (!canvas) return;
    // Dynamic resizing later on?
    canvas.width = 400;
    canvas.height = 400;
    const [gameProps, gameApi] = createGame({ canvas });

    // Bind inputevents
    ["keydown", "keyup"].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        gameApi.inputEvent(event);
      });
    });

    gameApi.start();

    return () => {
      gameApi.stop();
    };
  };

  const createCanvas = (props) => {
    const canvas = document.createElement("canvas");
  };
  return { start };
};

export default SneksGame;
