import { Link } from "react-router-dom";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.home}>
      <img src="./Budget - 96.png" alt="budget" />
      <span>Welcome to Budget Buddy</span>
      <div className={classes["btn-grp"]}>
        <Link to="/login">Log In</Link>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
    // <div className={classes.home}>
    //   <div className={classes.about}>
    //     <p>
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
    //       cumque quibusdam odio exercitationem nostrum obcaecati ducimus
    //       consequatur sunt, perspiciatis ratione nobis asperiores deleniti esse
    //       iure expedita id aut officiis nesciunt!
    //     </p>
    //     <p>
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
    //       culpa! Culpa cupiditate sequi dolorem tenetur ad, explicabo quam sed
    //       sit cum aut animi suscipit. Laborum incidunt suscipit maxime nulla
    //       praesentium?
    //     </p>
    //   </div>
    //   <Login />
    // </div>
  );
};

export default Home;
