import Header from "../component/Header";
import Protected from "../component/authentication/Protected";
import ExpenseAccountForm from "../component/expense-account/expense-account-form";

const ExpenseAccountPage = () => {
  return (
    <Protected>
      <Header />
      <ExpenseAccountForm />
    </Protected>
  );
};

export default ExpenseAccountPage;
