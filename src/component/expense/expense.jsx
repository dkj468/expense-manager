import classes from "./expense.module.css";

const Expense = (props) => {
  const { expenseName, date, expenseAccountName, expenseAmount } = { ...props };
  return (
    <div className={classes.expense}>
      <div className={classes.detail}>
        <span>{expenseName}</span>
        <span className={classes["expense-date"]}>{date}</span>
      </div>
      <span>{expenseAccountName}</span>
      <span>{expenseAmount}</span>
    </div>
  );
};

export default Expense;
