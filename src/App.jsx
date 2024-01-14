import './App.css';
import { useState } from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


import {
  useWindowSize,
} from '@react-hook/window-size'




function App() {



  const [birthday, setBirthday] = useState(new Date('03/16/1999'));

  const [width] = useWindowSize()
  


  const datediff = (first, second) => {        
    const days =  Math.round((second - first) / (1000 * 60 * 60 * 24));

    let weeks = days/7;
    //There are actually 52.1429 weeks in a year. Throw away the extra
    weeks = Math.floor(weeks - (days/365 * .1429));
    return weeks;

  }

  const renderValueAxisLabels = (currTimeUnit) => {

    const labelHolder = [];

    if((currTimeUnit % 52 === 0) && ((currTimeUnit / 52) % 5 === 0)){
      labelHolder.push(
        (
          <p className="yLabel"> {currTimeUnit/52}</p>
        )
      );
    }
    if(currTimeUnit === 0){
      labelHolder.push(
        (
          <p className="xLabel"> 1 </p>
        )
      );
    }
    if(((currTimeUnit+1) % 5 === 0) && (currTimeUnit<52)){
      labelHolder.push(
        (
          <p className="xLabel"> {currTimeUnit+1}</p>
        )
      );
    }
    return labelHolder;
    
  }


  
  const renderWeekBoxes = (rows) => {


    const dynamicStyles = generateDynamicStyles();



    const weeksFinished = datediff( birthday,new Date())
    let weekHolder = [];
    for(var currTimeUnit = 0; currTimeUnit < 52 * rows; currTimeUnit++){
      weekHolder.push(
        <div key={currTimeUnit} data-testid='week' className="bigWeek" style={{width: dynamicStyles.boxWidth, height: dynamicStyles.boxWidth}}> 
          {renderValueAxisLabels(currTimeUnit)}
          <div
            data-testid={currTimeUnit < weeksFinished ? 'finishedWeek' : ''}
            className="smallWeek"
            style={{
              width: dynamicStyles.boxWidth-(dynamicStyles.innerBoxPadding*2),
              height: dynamicStyles.boxWidth-(dynamicStyles.innerBoxPadding*2),
              margin: dynamicStyles.innerBoxPadding,
              backgroundColor: currTimeUnit < weeksFinished ? '#FF3131' : '#FFFFFF'}}></div>
        </div>
      )
    }
    return weekHolder;
  }

  const generateDynamicStyles = () => {

    let margins;
    let innerContainer;
    let boxWidth;
    let innerBoxPadding;

    if(width < 500){
      margins = Math.floor(width * 0.1);

      

    }else{
      margins = Math.floor((width - 400) / 2);
    }

    innerContainer = width - (margins*2);
    margins = margins + ((innerContainer % 52)/2);
    innerContainer = innerContainer - (innerContainer % 52);
    boxWidth = Math.floor(innerContainer / 52);


    innerBoxPadding = Math.ceil(boxWidth / 8);

    return {
      margins: margins,
      boxWidth: boxWidth,
      innerBoxPadding: innerBoxPadding
    }
  }


  const render = () => {

    const dynamicStyles = generateDynamicStyles();
  
    return (
      <div className="App">
        <div className="container" style={{marginInline: dynamicStyles.margins}}>
            <div className="title" >
              <h1 > Life Counter </h1>
              <DatePicker
                wrapperClassName="datePicker"
                selected={birthday}
                onChange={(date) => setBirthday(date)} 
              />
            </div>
            <div className="weekHolderBox">
              <p className='weekText'> Weeks ... </p>
              <p className='yearText'> ... Years </p>
                {renderWeekBoxes(90)}
            </div> 
         </div>
      </div>
    );
  }
  

  return render();
}

export default App;
