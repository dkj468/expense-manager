import classes from "./expense.module.css";

const Expense = (props) => {
  const { expenseName, date, expenseAccountName, expenseAmount } = { ...props };

  const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = mm + "/" + dd + "/" + yyyy;
    return date;
  };
  return (
    <div className={classes.expense}>
      <div className={classes.detail}>
        <span>{expenseName}</span>
        <span className={classes["expense-date"]}>
          {convertTimestamp(date)}
        </span>
      </div>
      <span>{expenseAccountName}</span>
      <span>{expenseAmount}</span>
    </div>
  );
};

export default Expense;
