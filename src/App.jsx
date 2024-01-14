import "./App.css";
import { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import TimeUnitBoxHolder from "./components/TimeUnitBoxHolder/TimeUnitBoxHolder";

import useDynamicStyles from "./hooks/useDynamicStyles";

import {TimeType} from './constants/TimeType'

function App() {
  const [birthday, setBirthday] = useState(new Date("03/16/1999"));

  const [timeType] = useState(TimeType.Week)

  const dynamicStyles = useDynamicStyles(timeType);

  const render = () => {

    return (
      <div className="App">
        <div
          className="container"
          style={{ marginInline: dynamicStyles.margins }}
        >
          <div className="header">
            <h1> Life Counter </h1>
            <DatePicker
              wrapperClassName="datePicker"
              selected={birthday}
              onChange={(date) => setBirthday(date)}
            />
          </div>
          <TimeUnitBoxHolder
            birthday={birthday}
            timeType={timeType}
          />
        </div>
      </div>
    );
  };

  return render();
}

export default App;
