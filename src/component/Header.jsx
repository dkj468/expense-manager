import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useAuthContext } from "../store/authContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
const Header = () => {
  const navigate = useNavigate();
  const { user, IsLoggedIn, setLoggedInUser } = useAuthContext();

  const logout = () => {
    signOut(auth)
      .then(() => {
        setLoggedInUser(undefined);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const logoutHandler = () => {
    logout();
    navigate("/");
  };
  return (
    <div className={classes.header}>
      <Link className={classes.link} to="/">
        Expense Manager
      </Link>
      {user && IsLoggedIn() && (
        <div className={classes.action}>
          <span>Welcome {user.email}</span>
          <button type="button" onClick={logoutHandler}>
            Logout
          </button>
          {/* <button type="button">Settings</button> */}
        </div>
      )}
    </div>
  );
};

export default Header;
