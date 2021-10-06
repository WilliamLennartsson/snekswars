export const createHtmlComponent = (
  props = {
    type: "div",
    image: null,
    width: 400,
    height: 400,
    color: "rgb(50, 10, 50)",
  }
) => {
  const element = document.createElement(props.type || "div");

  console.log(`props`, props);
  const width = props.width;
  const height = props.height;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.backgroundColor = props.color;

  // element.classList.add("contentContainer");
  // element.className += " contentContainer"; // For the good old IE

  if (props.image) element.appendChild(props.image);

  return element;
}
