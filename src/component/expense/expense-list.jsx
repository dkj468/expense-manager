// container for expenses

import Expense from "./expense";
import classes from "./expense-list.module.css";

const ExpenseList = (props) => {
  const { expenses } = { ...props };

  return (
    <div className={classes["expense-container"]}>
      {expenses.map((expense) => {
        return <Expense key={expense.id} {...expense} />;
      })}
    </div>
  );
};

export default ExpenseList;
