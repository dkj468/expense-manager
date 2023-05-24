import { Outlet } from "react-router";
import Header from "../component/Header";
import { ExpenseContextProvider } from "../store/expenseContext";

const RootPage = () => {
  return (
    <>
   
      <ExpenseContextProvider>
        <Outlet />
      </ExpenseContextProvider>
    </>
  );
};

export default RootPage;
