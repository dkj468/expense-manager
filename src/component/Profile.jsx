import classes from "./Profile.module.css";
import { useAuthContext } from "../store/authContext";

const Profile = () => {
  const { user, IsLoggedIn, setLoggedInUser } = useAuthContext();

  if (!(user && IsLoggedIn())) {
    return;
  }
  const logoutHandler = () => {};
  return (
    <nav>
      <ul>
        <li>
          <img src="/image/profile.png" />
          <ul>
            <li className={classes["sub-item"]}>
              <span className={classes["material-icons-outlined"]}>
                grid_view
              </span>
              <p>Dashboard</p>
            </li>
            <li class={classes["sub-item"]}>
              <span className={classes["material-icons-outlined"]}>
                format_list_bulleted
              </span>
              <p>My Orders</p>
            </li>
            <li className={classes["sub-item"]}>
              <span className={classes["material-icons-outlined"]}>
                manage_accounts
              </span>
              <p>Update Profile</p>
            </li>
            <li className={classes["sub-item"]}>
              <span className={classes["material-icons-outlined"]}>logout</span>
              <p>Logout</p>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Profile;
