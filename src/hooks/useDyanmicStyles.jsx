import { useWindowSize } from "@react-hook/window-size";


export default function useDynamicStyles() {

  const [width] = useWindowSize();

  const generateDynamicStyles = () => {
    let margins;
    let innerContainer;
    let boxWidth;
    let innerBoxPadding;

    if (width < 500) {
      margins = Math.floor(width * 0.1);
    } else {
      margins = Math.floor((width - 400) / 2);
    }

    innerContainer = width - margins * 2;
    margins = margins + (innerContainer % 52) / 2;
    innerContainer = innerContainer - (innerContainer % 52);
    boxWidth = Math.floor(innerContainer / 52);

    innerBoxPadding = Math.ceil(boxWidth / 8);

    return {
      margins: margins,
      boxWidth: boxWidth,
      innerBoxPadding: innerBoxPadding,
    };
    
  };
  return generateDynamicStyles();
}
