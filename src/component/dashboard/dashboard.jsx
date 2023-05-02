import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ExpenseForm from "../expense/expense-form";
import ExpenseList from "../expense/expense-list";
import classes from "./dashboard.module.css";

const Dashboard = () => {
  const [isReload, setIsReload] = useState(false);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getDocs(collection(db, "expenses")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setExpenses(newData);
        setIsReload(false);
        console.log(newData);
      });
    };

    fetchData();
  }, [isReload]);

  return (
    <>
      <div>
        <h1>This month total expense : </h1>
      </div>
      <div className={classes.dashboard}>
        <ExpenseList expenses={expenses} />
        <ExpenseForm onReload={setIsReload} />
      </div>
    </>
  );
};

export default Dashboard;
