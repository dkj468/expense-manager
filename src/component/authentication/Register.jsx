import { useState } from "react";
import classes from "./Register.module.css";
import Loader from "../UI/Loader";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import { getErrorFromCode } from "../../Utils/AuthError";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  // const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const register = async (email, password) => {
    setError(undefined);
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setIsLoading(false);
        sendUserEmailVerification(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError({ errorCode, errorMessage });
        setIsLoading(false);
      });
  };

  const sendUserEmailVerification = async (user) => {
    setError(undefined);
    setIsLoading(true);
    setIsEmail(false);
    sendEmailVerification(user)
      .then(() => {
        console.log("email sent successfully");
        setIsLoading(false);
        setIsEmail(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError({ errorCode, errorMessage });
        setIsLoading(false);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    register(formData.email, formData.password);
    //sendUserEmailVerification();
  };
  return (
    <div className={classes.register}>
      {isLoading && <Loader />}
      <img src="./Budget - 96.png" alt="budget" />
      <h4>Create your account</h4>
      <p className={classes["verify-text"]}>
        Please note that email verification is required for signup. A
        verification email will be sent - Please check spam folder if not found
        in inbox.
      </p>
      <form className={classes.form} onSubmit={submitHandler}>
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
        <button type="submit" disabled={isLoading}>
          Sing Up
        </button>
        {error && (
          <span className={classes.error}>
            {getErrorFromCode(error.errorCode)}
          </span>
        )}
        {isEmail && (
          <span className={classes.info}>
            An email has been sent to your email id. Please click on the link
            provided and verify your email address.
          </span>
        )}
      </form>
      <span className={classes["log-in"]}>
        Already have an account ? <Link to="/login">Log In</Link>
      </span>
    </div>
  );
};

export default Register;
