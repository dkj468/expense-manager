import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import useInput from "../../hooks/useInput";
import classes from "./expense-form.module.css";
import { db } from "../../firebase";

const modelObj = {
  expenseName: undefined,
  expenseAmount: undefined,
  expenseAccount: undefined,
};

const errorObj = {
  expenseName: null,
  expenseAmount: null,
  expenseAccount: null,
};

const expenseAccounts = [
  { id: 1, name: "ICICI Bank" },
  { id: 2, name: "HDFC Bank" },
  { id: 3, name: "PhonePay (HDFC Bank)" },
  { id: 4, name: "Amazon Pay" },
];
const ExpenseForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(undefined);
  const { modelState, errorState, handleChange } = useInput(modelObj, errorObj);

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
      const docRef = await addDoc(collection(db, "expenses"), {
        date: new Date().toLocaleString(),
        user: "Deepak Jain",
        expenseAccountName:
          expenseAccounts[modelState["expenseAccount"] - 1].name,
        ...modelState,
      });
      console.log("Document written with ID: ", docRef.id);
      props.onReload(true);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  return (
    <div className={classes.expenseForm}>
      <form className={classes.form} onSubmit={handleSubmit}>
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
                  {account.name}
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
