import "../App.css";

import "react-datepicker/dist/react-datepicker.css";



import useDynamicStyles from "../hooks/useDyanmicStyles";

function WeekBoxHolder(props) {


  const dynamicStyles = useDynamicStyles();



  const datediff = (first, second) => {
    const days = Math.round((second - first) / (1000 * 60 * 60 * 24));

    let weeks = days / 7;
    //There are actually 52.1429 weeks in a year. Throw away the extra
    weeks = Math.floor(weeks - (days / 365) * 0.1429);
    return weeks;
  };

  const renderValueAxisLabels = (currTimeUnit) => {
    const labelHolder = [];

    if (currTimeUnit % 52 === 0 && (currTimeUnit / 52) % 5 === 0) {
      labelHolder.push(<p className="yLabel"> {currTimeUnit / 52}</p>);
    }
    if (currTimeUnit === 0) {
      labelHolder.push(<p className="xLabel"> 1 </p>);
    }
    if ((currTimeUnit + 1) % 5 === 0 && currTimeUnit < 52) {
      labelHolder.push(<p className="xLabel"> {currTimeUnit + 1}</p>);
    }
    return labelHolder;
  };

  const renderWeekBoxes = (rows, birthday) => {

    const weeksFinished = datediff(birthday, new Date());
    let weekHolder = [];
    for (var currTimeUnit = 0; currTimeUnit < 52 * rows; currTimeUnit++) {
      weekHolder.push(
        <div
          key={currTimeUnit}
          data-testid="week"
          className="bigWeek"
          style={{
            width: dynamicStyles.boxWidth,
            height: dynamicStyles.boxWidth,
          }}
        >
          {renderValueAxisLabels(currTimeUnit)}
          <div
            data-testid={currTimeUnit < weeksFinished ? "finishedWeek" : ""}
            className="smallWeek"
            style={{
              width: dynamicStyles.boxWidth - dynamicStyles.innerBoxPadding * 2,
              height:
                dynamicStyles.boxWidth - dynamicStyles.innerBoxPadding * 2,
              margin: dynamicStyles.innerBoxPadding,
              backgroundColor:
                currTimeUnit < weeksFinished ? "#FF3131" : "#FFFFFF",
            }}
          ></div>
        </div>
      );
    }
    return weekHolder;
  };


  const render = () => {
    return (
      <div className="weekHolderBox">
        <p className="weekText"> Weeks ... </p>
        <p className="yearText"> ... Years </p>
        {renderWeekBoxes(props.rows, props.birthday)}
      </div>
    );
  };

  return render();
}

export default WeekBoxHolder;
