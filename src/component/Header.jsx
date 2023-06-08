import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useAuthContext } from "../store/authContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useCustomContext } from "../store/CustomContext";
const Header = () => {
  const navigate = useNavigate();
  const { user, IsLoggedIn, setLoggedInUser } = useAuthContext();
  const { showMenu } = useCustomContext();

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
    <>
      <nav className={classes.nav}>
        <span className={classes.logo} onClick={() => navigate("/")}>
          <img src="./Budget - 96.png" alt="budget" />
          Budget Buddy
        </span>

        {user && IsLoggedIn() && (
          <>
            <img
              src="./image/profile.png"
              alt="profile"
              className={classes["user-pic"]}
              id="profile-img"
            />
            {showMenu && (
              <div className={classes["sub-menu-wrap"]}>
                <div className={classes["sub-menu"]}>
                  <div className={classes["user-info"]}>
                    <h5>Welcome {user.email.substring(0, 10)}</h5>
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
