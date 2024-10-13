import "./Visualizer.css";
import { useState } from "react";
import { TimeType } from "../../constants/TimeType";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useDynamicStyles from "../../hooks/useDynamicStyles";

import TimeUnitBoxHolder from "../../components/TimeUnitBoxHolder/TimeUnitBoxHolder";
import TimeUnitSelection from "../../components/TimeUnitSelection/TimeUnitSelection";

function Visualizer() {
  const [timeType, setTimeType] = useState(TimeType.Week);
  const dynamicStyles = useDynamicStyles(timeType);

  const [birthday, setBirthday] = useState(new Date("03/16/1999"));
  const render = () => {
    return (
      <>
        <div
          style={{ marginInline: dynamicStyles.margins }}
        >
          <div className="header">
            <h1> Life Counter </h1>
            <TimeUnitSelection setTimeType={setTimeType} timeType={timeType} />
            <DatePicker
              wrapperClassName="datePicker"
              selected={birthday}
              onChange={(date) => setBirthday(date)}
            />
          </div>
          <TimeUnitBoxHolder birthday={birthday} timeType={timeType} />
        </div>
      </>
    );
  };

  return render();
}

export default Visualizer;
