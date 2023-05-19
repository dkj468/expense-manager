import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthContextProvider } from "./store/authContext";
import Protected from "./component/authentication/Protected";
import ExpenseAccountForm from "./component/expense-account/expense-account-form";
import { useCustomContext } from "./store/CustomContext";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "dashboard",
        element: (
          <Protected>
            <DashboardPage />
          </Protected>
        ),
      },
      {
        path: "accounts",
        element: (
          <Protected>
            <ExpenseAccountForm />
          </Protected>
        ),
      },
    ],
  },
]);

const App = () => {
  const { setIsShowMenu } = useCustomContext();

  // useEffect(() => {
  //   function handleClick(e) {
  //     console.log(e.target);
  //     if (e.srcElement.id === "profile-img") {
  //       setIsShowMenu((prevVal) => {
  //         return !prevVal;
  //       });
  //     } else {
  //       setIsShowMenu(false);
  //     }
  //   }
  //   document.body.addEventListener("click", (e) => handleClick(e));
  //   return () => {
  //     document.body.removeEventListener("click", handleClick);
  //   };
  // });
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
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
};

export default App;
