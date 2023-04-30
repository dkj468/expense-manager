import { useState } from "react";
import ExpenseForm from "../expense/expense-form";
import ExpenseList from "../expense/expense-list";
import classes from "./dashboard.module.css";

const Dashboard = () => {
  const [isReload, setIsReload] = useState(false);
  return (
    <div className={classes.dashboard}>
      <ExpenseList isReload={isReload} onReload={setIsReload} />
      <ExpenseForm onReload={setIsReload} />
    </div>
  );
};

export default Dashboard;
