import ExpenseForm from "../expense/expense-form";
import ExpenseList from "../expense/expense-list";
import Loader from "../UI/Loader";
import classes from "./dashboard.module.css";
import { useExpenseContext } from "../../store/expenseContext";

const Dashboard = () => {
  const { expenses, IsLoading } = useExpenseContext();

  const calculateMonthlyExpense = () => {
    let monthlyData = 0;
    expenses.forEach((expense) => {
      monthlyData += expense.expenseAmount * 1;
    });
    return monthlyData;
  };

  if (IsLoading) {
    return <Loader />;
  }
  return (
    <>
      <div>
        <h1>This month total expense : {calculateMonthlyExpense()}</h1>
      </div>
      <div className={classes.dashboard}>
        <ExpenseList expenses={expenses} />
        <ExpenseForm />
      </div>
    </>
  );
};

export default Dashboard;
