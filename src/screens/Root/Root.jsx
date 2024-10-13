import "./Root.css";
import { TimeType } from "../../constants/TimeType";
import { Outlet, Link} from "react-router-dom";
import { useState } from "react";
import useDynamicStyles from "../../hooks/useDynamicStyles";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GoogleOAuthClientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";

function Root() {
  const [timeType, setTimeType] = useState(TimeType.Week);
  const dynamicStyles = useDynamicStyles(timeType);

  const render = () => {
    return (
      <GoogleOAuthProvider clientId={GoogleOAuthClientID}>
        <div className="App">
          <div className="NavBar">
            <div className="NavEntry">
              <Link className="NavEntry" to={'/'}> Life Counter </Link>
            </div>
            <div className="NavEntry">
              <Link className="NavEntry" to={'/login'}> Login </Link>
            </div>
          </div>
          <div
            className="container"
            style={{ marginInline: dynamicStyles.margins }}
          >
            <Outlet />
          </div>
        </div>
      </GoogleOAuthProvider>
    );
  };

  return render();
}

export default Root;
