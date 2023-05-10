import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useAuthContext } from "../../store/authContext";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    login("test@test.com");
    navigate("/dashboard");
  };
  return (
    <form className={classes.form} onSubmit={loginHandler}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <div>
        <label>Don't have a account yet ?</label>
        <Link to="/register"> SignUp</Link>
      </div>
    </form>
  );
};

export default Login;
