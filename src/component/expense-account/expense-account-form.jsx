import classes from "./expense-account-form.module.css";
import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import { useAuthContext } from "../../store/authContext";
import { useExpenseContext } from "../../store/expenseContext";

const modelObj = {
    accountName: undefined,
    accountDescription: undefined,
    initialBalance: 0,
    currentBalance: 0
  };
  
  const errorObj = {
    accountName: null,
    accountDescription: null,
    initialBalance: null,
    currentBalance: undefined,
  };
  

  const ExpenseAccountForm = (props) => {
    const [isFormValid, setIsFormValid] = useState(undefined);
    const { modelState, errorState, handleChange } = useInput(modelObj, errorObj);
    const { user } = useAuthContext();
  
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
          expenseAccountName:
            expenseAccounts[modelState["expenseAccount"] - 1].name,
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
        <span className={classes["form-header"]}>Add Expense Account</span>
        <form onSubmit={handleSubmit}>
          <div className={classes["form-field"]}>
            <label htmlFor="expenseName">Account Name</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={modelState["accountName"]}
              onChange={handleChange}
            />
            {errorState["accountName"] && (
              <label className={classes.error}>{errorState["accountName"]}</label>
            )}
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="expenseAmount">Account Description</label>
            <textarea
              id="accountDescription"
              name="accountDescription"
              value={modelState["accountDescription"]}
              onChange={handleChange}
            />
            {errorState["accountDescription"] && (
              <label className={classes.error}>
                {errorState["accountDescription"]}
              </label>
            )}
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="expenseName">Initial Balance</label>
            <input
              type="number"
              id="initialBalance"
              name="initialBalance"
              value={modelState["initialBalance"]}
              onChange={handleChange}
            />
            {errorState["initialBalance"] && (
              <label className={classes.error}>{errorState["initialBalance"]}</label>
            )}
          </div>          
          <div className={classes["form-field"]}>
            <label htmlFor="expenseName">Current Balance</label>
            <input
              type="number"
              id="currentBalance"
              name="currentBalance"
              value={modelState["currentBalance"]}
              onChange={handleChange}
            />
            {errorState["currentBalance"] && (
              <label className={classes.error}>{errorState["currentBalance"]}</label>
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
  

export default ExpenseAccountForm;