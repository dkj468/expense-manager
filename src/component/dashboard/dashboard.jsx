import ExpenseForm from "../expense/expense-form";
import ExpenseList from "../expense/expense-list";
import Loader from "../UI/Loader";
import classes from "./dashboard.module.css";
import { useExpenseContext } from "../../store/expenseContext";
import SideMenu from "../sideMenu";

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
    <div className={classes.dashboard}>
    {/* <ExpenseList />
    <ExpenseForm /> */}
    <SideMenu />
  </div>
  );
};

export default Dashboard;
