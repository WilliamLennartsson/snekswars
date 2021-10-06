import { createGame } from "./game";
import { createHtmlComponent } from "./htmlUtils";

/**
 * 
 * @param props { container: div } 
 * @returns A start function.
 * const { start } = SneksGame()
 */
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

  const width =  convertPxToNumber(container.style.width)
  const height = convertPxToNumber(container.style.height)

  const canvas = createHtmlComponent({ type: "canvas", width, height });
  container.appendChild(canvas);

  /**
   * 
   * @returns A stop function. stop()
   * const stop = start()
   */
  const start = () => {
    if (!canvas) return;

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

  return { start };
};

export default SneksGame;
