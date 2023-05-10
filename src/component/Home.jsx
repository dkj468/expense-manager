import classes from "./Home.module.css";
import Login from "./authentication/Login";
const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.about}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          cumque quibusdam odio exercitationem nostrum obcaecati ducimus
          consequatur sunt, perspiciatis ratione nobis asperiores deleniti esse
          iure expedita id aut officiis nesciunt!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
          culpa! Culpa cupiditate sequi dolorem tenetur ad, explicabo quam sed
          sit cum aut animi suscipit. Laborum incidunt suscipit maxime nulla
          praesentium?
        </p>
      </div>
      <Login />
    </div>
  );
};

export default Home;
