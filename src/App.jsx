import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthContextProvider } from "./store/authContext";

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
        element: <DashboardPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
