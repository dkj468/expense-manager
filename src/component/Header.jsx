import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useAuthContext } from "../store/authContext";
const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };
  return (
    <div className={classes.header}>
      <Link className={classes.link} to="/">
        Expense Manager
      </Link>
      {user && user.isLoggedIn && (
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
