import "./Visualizer.css";
import { useState } from "react";
import { TimeType } from "../../constants/TimeType";

import DatePicker from "react-datepicker";

import {
  GoogleLogin,
} from "@react-oauth/google";

import "react-datepicker/dist/react-datepicker.css";

import TimeUnitBoxHolder from "../../components/TimeUnitBoxHolder/TimeUnitBoxHolder";
import TimeUnitSelection from "../../components/TimeUnitSelection/TimeUnitSelection";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";


function Visualizer() {
  const [timeType, setTimeType] = useState(TimeType.Week);
  


  const [birthday, setBirthday] = useState(new Date("03/16/1999"));
  const render = () => {
    
    return (
      <>
            <div className="header">
              <h1> Life Counter </h1>
              <TimeUnitSelection
                setTimeType={setTimeType}
                timeType={timeType}
              />
              <DatePicker
                wrapperClassName="datePicker"
                selected={birthday}
                onChange={(date) => setBirthday(date)}
              />
            </div>
            <TimeUnitBoxHolder birthday={birthday} timeType={timeType} />
        </>
    );
  };

  return render();
}

export default Visualizer;
