import { useEffect, useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import useInput from "../../hooks/useInput";
import classes from "./expense-form.module.css";
import { db } from "../../firebase";
import { useAuthContext } from "../../store/authContext";
import { useExpenseContext } from "../../store/expenseContext";

const getFormattedDate = (date) => {
  const formateDay =
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const formatMonth =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const formatDate = [date.getFullYear(), formatMonth, formateDay].join("-");
  return formatDate;
};
const modelObj = {
  expenseName: "",
  expenseAmount: 0,
  expenseAccount: -1,
  expenseDate: getFormattedDate(new Date()),
};

const errorObj = {
  expenseName: null,
  expenseAmount: null,
  expenseAccount: null,
  expenseDate: undefined,
};

const ExpenseForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(undefined);
  const { modelState, errorState, handleChange } = useInput(modelObj, errorObj);
  const { user } = useAuthContext();
  const { addExpense, expenseAccounts } = useExpenseContext();

  useEffect(() => {
    setIsFormValid(true);
    for (const [key] of Object.entries(modelState)) {
      if (!modelState[key]) {
        setIsFormValid(false);
        break;
      }
    }
    for (const [key] of Object.entries(errorState)) {
      if (errorState[key]) {
        setIsFormValid(false);
        break;
      }
    }
  }, [modelState, errorState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expense = {
        user: user.uid,
        expenseAccountName: expenseAccounts.find(
          (account) => account.id === modelState["expenseAccount"]
        )?.accountName,
        ...modelState,
        expenseDate: Timestamp.fromDate(new Date(modelState["expenseDate"])),
      };
      const docRef = await addDoc(collection(db, "expenses"), expense);
      console.log("Document written with ID: ", docRef.id);
      addExpense({ id: docRef.id, ...expense });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  return (
    <div className={classes.form}>
      <span className={classes["form-header"]}>Expense Detail</span>
      <form onSubmit={handleSubmit}>
        <div className={classes["form-field"]}>
          <label htmlFor="expenseName">Expense Name</label>
          <input
            type="text"
            id="expenseName"
            name="expenseName"
            value={modelState["expenseName"]}
            onChange={handleChange}
          />
          {errorState["expenseName"] && (
            <label className={classes.error}>{errorState["expenseName"]}</label>
          )}
        </div>
        <div className={classes["form-field"]}>
          <label htmlFor="expenseAmount">Expense Amount</label>
          <input
            type="number"
            id="expenseAmount"
            name="expenseAmount"
            value={modelState["expenseAmount"]}
            onChange={handleChange}
          />
          {errorState["expenseAmount"] && (
            <label className={classes.error}>
              {errorState["expenseAmount"]}
            </label>
          )}
        </div>
        <div className={classes["form-field"]}>
          <label htmlFor="expenseAccount">Expense Account</label>
          <select
            id="expenseAccount"
            name="expenseAccount"
            value={modelState["expenseAccount"]}
            onChange={handleChange}
          >
            <option value={-1}>Select an account</option>
            {expenseAccounts.map((account) => {
              return (
                <option value={account.id} key={account.id}>
                  {account.accountName}
                </option>
              );
            })}
          </select>
          {errorState["expenseAccount"] && (
            <label className={classes.error}>
              {errorState["expenseAccount"]}
            </label>
          )}
        </div>
        <div className={classes["form-field"]}>
          <label htmlFor="expenseDate">Expense Date</label>
          <input
            type="date"
            id="expenseDate"
            name="expenseDate"
            value={modelState["expenseDate"]}
            onChange={handleChange}
          />
          {errorState["expenseDate"] && (
            <label className={classes.error}>{errorState["expenseDate"]}</label>
          )}
        </div>
        <div className={classes["form-button"]}>
          <button type="submit" disabled={!isFormValid}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
