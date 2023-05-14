import { Outlet } from "react-router";
import Header from "../component/Header";

const RootPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootPage;
