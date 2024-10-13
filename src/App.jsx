import "./App.css";
import { useState } from "react";

import DatePicker from "react-datepicker";

import {
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

import "react-datepicker/dist/react-datepicker.css";

import TimeUnitBoxHolder from "./components/TimeUnitBoxHolder/TimeUnitBoxHolder";

import useDynamicStyles from "./hooks/useDynamicStyles";

import { TimeType } from "./constants/TimeType";
import TimeUnitSelection from "./components/TimeUnitSelection/TimeUnitSelection";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/features/user/userSlice";

const GoogleOAuthClientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";

function App() {
  const idToken = useSelector((state) => state.user.idToken);
  const dispatch = useDispatch();

  const [birthday, setBirthday] = useState(new Date("03/16/1999"));
  const [timeType, setTimeType] = useState(TimeType.Week);
  

  const dynamicStyles = useDynamicStyles(timeType);


  
  
  const render = () => {
    
    return (
      <GoogleOAuthProvider clientId={GoogleOAuthClientID}>
        <div className="App">
          <div
            className="container"
            style={{ marginInline: dynamicStyles.margins }}
          >
            <div className="header">
              {idToken !== null ? (
                idToken
              ) : (
                <>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    dispatch(setUser(credentialResponse.credential));
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
                </>
              )}
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
          </div>
        </div>
      </GoogleOAuthProvider>
    );
  };

  return render();
}

export default App;
