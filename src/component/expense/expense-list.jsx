// container for expenses
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Expense from "./expense";
import classes from "./expense-list.module.css";

const ExpenseList = (props) => {
  const [expenses, setExpenses] = useState([]);
  const { isReload, onReload } = { ...props };

  useEffect(() => {
    const fetchData = async () => {
      await getDocs(collection(db, "expenses")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setExpenses(newData);
        onReload(false);
        console.log(newData);
      });
    };

    fetchData();
  }, [isReload, onReload]);

  return (
    <div class={classes["expense-container"]}>
      {expenses.map((expense) => {
        return <Expense key={expense.id} {...expense} />;
      })}
    </div>
  );
};

export default ExpenseList;
