import classes from "./Header.module.css";
const Header = () => {
  return (
    <div className={classes.header}>
      <h1>Expense Manager</h1>
      <button type="button">Add expense</button>
    </div>
  );
};

export default Header;
