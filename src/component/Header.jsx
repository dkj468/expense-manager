import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useAuthContext } from "../store/authContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const { user, IsLoggedIn, setLoggedInUser } = useAuthContext();
  const [showMenu, setIsShowMenu] = useState(false);

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

  const imgClickHandler = () => {
    setIsShowMenu((prevState) => {
      return !prevState;
    });
  };
  return (
    <>
      <nav>
        <span className={classes.logo}>ExpenseGPT</span>

        {user && IsLoggedIn() && (
          <>
            <img
              src="./image/profile.png"
              alt="profile"
              className={classes["user-pic"]}
              onClick={imgClickHandler}
            />
            {showMenu && (
              <div
                className={classes["sub-menu-wrap"]}
                onClick={imgClickHandler}
              >
                <div className={classes["sub-menu"]}>
                  <div className={classes["user-info"]}>
                    <h5>Welcome Deepak</h5>
                  </div>
                  <hr />
                  <Link to="/accounts" className={classes["sub-menu-link"]}>
                    <img src="./image/Account.png" alt="profile" />
                    <p>Expense Accounts</p>
                    <span>&gt;</span>
                  </Link>

                  <Link to="/" className={classes["sub-menu-link"]}>
                    <img src="./image/user.png" alt="profile" />
                    <p>Profile</p>
                    <span>&gt;</span>
                  </Link>
                  <Link
                    className={classes["sub-menu-link"]}
                    onClick={logoutHandler}
                  >
                    <img src="./image/logout.png" alt="profile" />
                    <p>Logout</p>
                    <span>&gt;</span>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </nav>
    </>
  );
};

export default Header;
