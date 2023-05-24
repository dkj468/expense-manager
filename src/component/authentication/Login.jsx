import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useAuthContext } from "../../store/authContext";
import Loader from "../UI/Loader";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { getErrorFromCode } from "../../Utils/AuthError";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedInUser } = useAuthContext();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified) {
          setLoggedInUser({
            email: user.email,
            emailVerified: user.emailVerified,
            accessToken: user.stsTokenManager.accessToken,
            expirationTime: user.stsTokenManager.expirationTime,
            uid: user.uid,
          });
          console.log(user);
          navigate("/dashboard");
        } else {
          setError({ errorCode: "EMAIL_NOT_VERIFIED", errorMessage: "" });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError({ errorCode, errorMessage });
        setIsLoading(false);
      });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };
  return (
    <div className={classes.login}>
      {isLoading && <Loader />}
      <img src="./Budget - 96.png" alt="budget" />
      <h3>Welcome back</h3>
      <form className={classes.form} onSubmit={loginHandler}>
        <input
          type="email"
          name="email"
          placeholder="Please enter your email..."
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Please provide a password..."
          onChange={changeHandler}
        />
        <button type="submit" onClick={loginHandler}>
          Login
        </button>
        {error && (
          <span className={classes.error}>
            {getErrorFromCode(error.errorCode)}
          </span>
        )}
      </form>
      <span className={classes["Sign-up"]}>
        Already have an account ? <Link to="/register">Sign up</Link>
      </span>
    </div>
  );
};

export default Login;
