import Dashboard from "../component/dashboard/dashboard";
import { ExpenseContextProvider } from "../store/expenseContext";

const DashboardPage = () => {
  return (
    <ExpenseContextProvider>
      <Dashboard />
    </ExpenseContextProvider>
  );
};

export default DashboardPage;
