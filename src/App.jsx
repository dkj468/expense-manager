import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthContextProvider } from "./store/authContext";
import { ExpenseContextProvider } from "./store/expenseContext";
import { useCustomContext } from "./store/CustomContext";
import LoginPage from "./pages/LoginPage";
import ExpenseAccountPage from "./pages/ExpenseAccountPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/accounts",
    element: <ExpenseAccountPage />,
  },
]);

const App = () => {
  const { setIsShowMenu } = useCustomContext();

  const clickHandler = (e) => {
    if (e.target.id === "profile-img") {
      setIsShowMenu((prevState) => {
        return !prevState;
      });
    } else {
      setIsShowMenu(false);
    }
  };
  return (
    <div onClick={clickHandler}>
      <AuthContextProvider>
        <ExpenseContextProvider>
          <RouterProvider router={router} />
        </ExpenseContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
