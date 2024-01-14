import { TimeType } from "../../constants/TimeType";

import  "./TimeUnitSelection.css"

function TimeUnitSelection(props) {
  const handleChange = (event) => {
    props.setTimeType(event.target.value);
  };

  const render = () => {
    return (
      <select name="timeType" id="timeType" onChange={handleChange} value={props.TimeType}>
        <option value={TimeType.Week}>{TimeType.Week}</option>
        <option value={TimeType.Month}>{TimeType.Month}</option>
        <option value={TimeType.Year}>{TimeType.Year}</option>
      </select>
    );
  };

  return render();
}

export default TimeUnitSelection;
