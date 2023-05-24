import Header from "../component/Header";
import Protected from "../component/authentication/Protected";
import Dashboard from "../component/dashboard/dashboard";

const DashboardPage = () => {
  return (
    <Protected>
      <Header />
      <Dashboard />
    </Protected>
  );
};

export default DashboardPage;
