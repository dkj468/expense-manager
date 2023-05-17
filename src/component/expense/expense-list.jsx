// container for expenses

import DataTable from "react-data-table-component";
// import Expense from "./expense";
import classes from "./expense-list.module.css";
import { useExpenseContext } from "../../store/expenseContext";

const convertTimestamp = (timestamp) => {
  let date = timestamp.toDate();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let yyyy = date.getFullYear();

  date = mm + "/" + dd + "/" + yyyy;
  return date;
};

const customStyles = {
  rows: {
    style: {
      minHeight: "36px", // override the row height
    },
  },
  headCells: {
    style: {
      fontSize: "1.2rem",
    },
  },
};
const columns = [
  {
    name: "Expense",
    selector: (row) => row.expenseName,
  },
  {
    name: "Expense Account",
    selector: (row) => row.expenseAccountName,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => convertTimestamp(row.expenseDate),
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.expenseAmount * 1,
    sortable: true,
  },
];

const ExpenseList = (props) => {
  const { expenses } = useExpenseContext();

  return (
    <div className={classes["expense-container"]}>
      {/* {expenses.map((expense) => {
        return <Expense key={expense.id} {...expense} />;
      })} */}
      <DataTable
        columns={columns}
        data={expenses}
        pagination
        responsive
        customStyles={customStyles}
      />
    </div>
  );
};

export default ExpenseList;
