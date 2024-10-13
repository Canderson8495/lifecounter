import "./Root.css";
import { TimeType } from "../../constants/TimeType";
import { Outlet, Link} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";

import { clearUser } from "../../redux/features/user/userSlice";
const GoogleOAuthClientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";

function Root() {


  const logUserOut = () => {
    dispatch(clearUser());
  }

  const dispatch = useDispatch();

  const idToken = useSelector((state) => state.user.idToken);

  const render = () => {
    return (
      <GoogleOAuthProvider clientId={GoogleOAuthClientID}>
        <div className="App">
          <div className="NavBar">
            <div className="NavEntry">
              <Link className="NavEntry" to={'/'}> Life Counter </Link>
            </div>
            <div className="NavEntry">
              {idToken ? (
                <button className="NavEntry" onClick={logUserOut}>Logout</button>
              ) : (
                <Link className="NavEntry" to={'/login'}> Login </Link>
              )}
            </div>
          </div>
          <div className="container">
            <Outlet />
          </div>
        </div>
      </GoogleOAuthProvider>
    );
  };

  return render();
}

export default Root;
