
import { TimeType } from "../../constants/TimeType";

export default function TimeUnitConfig(timeType) {



  const weekType = () => {
    return {
        numColumns: 52,
        columnLabel: "Weeks",
        numRows: 90,
        rowLabel: "Years",
    };
  };

  const returnConfig = () => {
    if(timeType === TimeType.Week){
        return weekType();
    }
  }


  return returnConfig(timeType);
}
