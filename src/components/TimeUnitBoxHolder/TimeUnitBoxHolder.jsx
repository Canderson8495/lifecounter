import "./TimeUnitBoxHolder.css";

import "react-datepicker/dist/react-datepicker.css";

import useDynamicStyles from "../../hooks/useDynamicStyles";

import TimeUnitConfig from "../TimeUnitConfig/TimeUnitConfig";

import {TimeType} from "../../constants/TimeType"


function WeekBoxHolder(props) {

  const timeUnitConfig = TimeUnitConfig(props.timeType);
  const dynamicStyles = useDynamicStyles(props.timeType);



  const weekDiff = (first, second) => {

    const dayInMilliseconds = 1000 * 60 * 60 * 24
    const days = Math.round((second - first) / dayInMilliseconds);

    let weeks = days / 7;
    //There are actually 52.1429 weeks in a year. Throw away the extra
    weeks = Math.floor(weeks - (days / 365) * 0.1429);
    return weeks;
  };

  const monthDiff = (first, second) => {

    let months = (second.getFullYear() - first.getFullYear()) * 12;
    months = months + (second.getMonth() - first.getMonth());
    return months;

  }

  const yearDiff = (first, second) => {

    let years = second.getFullYear() - first.getFullYear()
    if(second.getMonth() < first.getMonth() || (second.getMonth() === first.getMonth() && second.getDate() < first.getDate())){
      years--;
    }
    return years;

  }

  const renderValueAxisLabels = (currTimeUnit) => {
    const labelHolder = [];

    if (currTimeUnit % timeUnitConfig.numColumns === 0 && (currTimeUnit / timeUnitConfig.numColumns) % 5 === 0) {
      labelHolder.push(<p className="yLabel"> {(currTimeUnit / timeUnitConfig.numColumns)*timeUnitConfig.rowValueMultiplier}</p>);
    }
    if (currTimeUnit === 0) {
      labelHolder.push(<p className="xLabel"> 1 </p>);
    }
    if ((currTimeUnit + 1) % 5 === 0 && currTimeUnit < timeUnitConfig.numColumns) {
      labelHolder.push(<p className="xLabel"> {currTimeUnit + 1}</p>);
    }
    return labelHolder;
  };

  const renderWeekBoxes = ( birthday) => {



    let timeUnitsFinished;
    if(props.timeType === TimeType.Week){
      timeUnitsFinished = weekDiff(birthday, new Date());
    }else if (props.timeType === TimeType.Month){
      timeUnitsFinished = monthDiff(birthday, new Date());
    }else if (props.timeType === TimeType.Year){
      timeUnitsFinished = yearDiff(birthday, new Date());
    }
    
    let weekHolder = [];
    for (var currTimeUnit = 0; currTimeUnit < timeUnitConfig.numColumns * timeUnitConfig.numRows; currTimeUnit++) {
      weekHolder.push(
        <div
          key={currTimeUnit}
          data-testid="timeUnitBox"
          style={{
            width: dynamicStyles.boxWidth,
            height: dynamicStyles.boxWidth,
          }}
        >
          {renderValueAxisLabels(currTimeUnit)}
          <div
            data-testid={currTimeUnit < timeUnitsFinished ? "finishedTimeUnit" : ""}
            style={{
              width: dynamicStyles.boxWidth - dynamicStyles.innerBoxPadding * 2,
              height:
                dynamicStyles.boxWidth - dynamicStyles.innerBoxPadding * 2,
              margin: dynamicStyles.innerBoxPadding,
              backgroundColor:
                currTimeUnit < timeUnitsFinished ? "#FF3131" : "#FFFFFF",
            }}
          ></div>
        </div>
      );
    }
    return weekHolder;
  };


  const render = () => {
    return (
      <div className="TimeUnitHolderBox">
        <p className="HorizCatAxisText"> {timeUnitConfig.columnLabel} ... </p>
        <p className="VertCatAxisText"> ... {timeUnitConfig.rowLabel} </p>
        {renderWeekBoxes(props.birthday)}
      </div>
    );
  };

  return render();
}

export default WeekBoxHolder;
