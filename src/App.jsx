import "./App.css";
import { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import WeekBoxHolder from "./components/WeekBoxHolder";

import useDynamicStyles from "./hooks/useDyanmicStyles";

function App() {
  const [birthday, setBirthday] = useState(new Date("03/16/1999"));

  const dynamicStyles = useDynamicStyles();

  const render = () => {

    return (
      <div className="App">
        <div
          className="container"
          style={{ marginInline: dynamicStyles.margins }}
        >
          <div className="title">
            <h1> Life Counter </h1>
            <DatePicker
              wrapperClassName="datePicker"
              selected={birthday}
              onChange={(date) => setBirthday(date)}
            />
          </div>
          <WeekBoxHolder
            rows={90}
            birthday={birthday}
          />
        </div>
      </div>
    );
  };

  return render();
}

export default App;
