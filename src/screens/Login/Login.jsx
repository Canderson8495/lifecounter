import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";
import "./Login.css";

function Login() {

  const dispatch = useDispatch();

  const render = () => {
    return (
      <>
        <h1> Login </h1>
          <div className="loginContainer">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                dispatch(setUser(credentialResponse.credential));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              width={'200px'}
            />
          </div>
      </>
    );
  };

  return render();
}

export default Login;
