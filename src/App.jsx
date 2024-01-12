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


  
  const renderWeekBoxes = (rows, boxWidth, innerPadding) => {



    const weeksFinished = datediff( birthday,new Date())
    let weekHolder = [];
    for(var x = 0; x < 52*rows; x++){
      weekHolder.push(
        <div key={x} data-testid='week' className="bigWeek" style={{width: boxWidth, height: boxWidth}}> 
          {
            ((x % 52 === 0) && ((x / 52) % 5 === 0)) &&
              (
                <p className="yLabel"> {x/52}</p>
              )
              
          }
          {
            (x === 0) &&
            (
              <p className="xLabel"> 1</p>
            )

          }
          {
            (((x+1) % 5 === 0) && (x<52)) &&
              (
                  <p className="xLabel"> {x+1}</p>
              )
          }
          <div data-testid={x < weeksFinished ? 'finishedWeek' : ''} className="smallWeek" style={{width: boxWidth-(innerPadding*2), height: boxWidth-(innerPadding*2),margin: innerPadding, backgroundColor: x < weeksFinished ? '#FF3131' : '#FFFFFF'}}></div>
        </div>
      )
    }
    return weekHolder;
  }


  const render = () => {

    let margins;
    let innerContainer;
    let boxWidth;
    let innerPadding;

    if(width < 500){
      margins = Math.floor(width * 0.1);

      

    }else{
      margins = Math.floor((width - 400) / 2);
    }

    innerContainer = width - (margins*2);
    margins = margins + ((innerContainer % 52)/2);
    innerContainer = innerContainer - (innerContainer % 52);
    boxWidth = Math.floor(innerContainer / 52);


    innerPadding = Math.ceil(boxWidth / 8);
    


    

    return (
      <div className="App">
        <div className="container" style={{marginInline: margins}}>
            <div className="title" >
              <h1 > LifeCounter </h1>
              <DatePicker
                wrapperClassName="datePicker"
                selected={birthday}
                onChange={(date) => setBirthday(date)} 
              />
            </div>
            <div className="weekHolderBox">
              <p className='weekText'> Weeks ... </p>
              <p className='yearText'> ... Years </p>
                {renderWeekBoxes(90, boxWidth, innerPadding)}
            </div> 
         </div>
      </div>
    );
  }
  

  return render();
}

export default App;
