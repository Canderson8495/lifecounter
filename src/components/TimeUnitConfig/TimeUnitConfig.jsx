
import { TimeType } from "../../constants/TimeType";

export default function TimeUnitConfig(timeType) {



  const weekType = () => {
    return {
        numColumns: 52,
        columnLabel: "Weeks",
        numRows: 90,
        rowLabel: "Years",
        rowValueMultiplier: 1,
    };
  };

  const MonthType = () => {
    return {
        numColumns: 36,
        columnLabel: "Months",
        numRows: 30,
        rowLabel: "Years",
        rowValueMultiplier: 3,
    };
  };

  const YearType = () => {
    return {
        numColumns: 10,
        columnLabel: "Years",
        numRows: 9,
        rowLabel: "Decades",
        rowValueMultiplier: 1,
    };
  };

  const returnConfig = () => {
    if(timeType === TimeType.Week){
        return weekType();
    }else if(timeType === TimeType.Month){
        return MonthType();
    }else if(timeType === TimeType.Year){
        return YearType();
    }
  }


  return returnConfig(timeType);
}
