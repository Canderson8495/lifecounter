import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";

function Login() {
  const idToken = useSelector((state) => state.user.idToken);

  const dispatch = useDispatch();

  const render = () => {
    return (
      <>
        <h1> Login </h1>
        {idToken !== null ? (
          idToken
        ) : (
          <>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                dispatch(setUser(credentialResponse.credential));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </>
        )}
      </>
    );
  };

  return render();
}

export default Login;
