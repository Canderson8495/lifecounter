import logo from './logo.svg';
import './App.css';
import './useWindowDimensions'



import {
  useWindowSize,
} from '@react-hook/window-size'


function App() {

  const [width, height] = useWindowSize()
  


  const datediff = (first, second) => {        
    const days =  Math.round((second - first) / (1000 * 60 * 60 * 24));

    let weeks = Math.floor(days/7);
    console.log(weeks);
    console.log("Correcting for 52.14 weeks in a year)")

    weeks = Math.floor(weeks - (days/365 * .1429));
    return weeks;

    

  }


  
  const renderWeekBoxes = (rows, boxWidth, innerPadding) => {



    const weeksFinished = datediff( new Date('03/16/1999'),new Date())
    console.log(weeksFinished)
    const age = 25;
    let weekHolder = [];
    for(var x = 0; x < 52*rows; x++){
      weekHolder.push(
        <div className="bigWeek" style={{width: boxWidth, height: boxWidth}}> 
          {
            ((x % 52 == 0) && ((x / 52) % 5 == 0)) &&
              (
                <p className="yLabel"> {x/52}</p>
              )
              
          }
          {
            (x == 0) &&
            (
              <p className="xLabel"> 1</p>
            )

          }
          {
            (((x+1) % 5 == 0) && (x<52)) &&
              (
                  <p className="xLabel"> {x+1}</p>
              )
          }
          <div className="smallWeek" style={{width: boxWidth-(innerPadding*2), height: boxWidth-(innerPadding*2),margin: innerPadding, backgroundColor: x < weeksFinished ? '#FF3131' : '#FFFFFF'}}></div>
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
    console.log("inner" + innerContainer);
    margins = margins + ((innerContainer % 52)/2);
    innerContainer = innerContainer - (innerContainer % 52);
    boxWidth = Math.floor(innerContainer / 52);


    innerPadding = Math.ceil(boxWidth / 8);
    


    

    return (
      <div className="App">
        <div className="container" style={{marginInline: margins}}>
            <h1 className="title"> Life Counter </h1>
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
