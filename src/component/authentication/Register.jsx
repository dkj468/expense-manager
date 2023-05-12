import { useState } from "react";
import classes from "./Register.module.css";
import { useAuthContext } from "../../store/authContext";
import { useNavigate } from "react-router";
import Loader from "../UI/Loader";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import { getErrorFromCode } from "../../Utils/AuthError";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {setUser } = useAuthContext();
  const navigate = useNavigate();

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
        setUser(userCredential.user);
        setIsLoading(false);
        sendUserEmailVerification(userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError({ errorCode, errorMessage });
        setIsLoading(false);
      });
  };

  const sendUserEmailVerification  = async(user)=> {
    sendEmailVerification(user)
    .then(() => {
      // Email verification sent!
      // ...x
      console.log("email sent successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    register(formData.email, formData.password);
    //sendUserEmailVerification();
  };
  return (
    <>
      {isLoading && <Loader />}
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
        <button type="submit" disabled={isLoading}>Sing Up</button>
        {error && (
          <span className={classes.error}>
            {getErrorFromCode(error.errorCode)}
          </span>
        )}
      </form>
    </>
  );
};

export default Register;
