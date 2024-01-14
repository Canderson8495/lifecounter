import { useWindowSize } from "@react-hook/window-size";

import TimeUnitConfig from "../components/TimeUnitConfig/TimeUnitConfig";



export default function useDynamicStyles(timeType) {

  const timeUnitConfig = TimeUnitConfig(timeType);

  const [width] = useWindowSize();

  const generateWeekDynamicStyles = () => {
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
    margins = margins + (innerContainer % timeUnitConfig.numColumns) / 2;
    innerContainer = innerContainer - (innerContainer % timeUnitConfig.numColumns);
    boxWidth = Math.floor(innerContainer / timeUnitConfig.numColumns);

    innerBoxPadding = Math.ceil(boxWidth / 8);

    return {
      margins: margins,
      boxWidth: boxWidth,
      innerBoxPadding: innerBoxPadding,
    };
    
  };



  return generateWeekDynamicStyles();
}
