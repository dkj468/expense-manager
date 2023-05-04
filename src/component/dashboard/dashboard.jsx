import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ExpenseForm from "../expense/expense-form";
import ExpenseList from "../expense/expense-list";
import Loader from "../UI/Loader";
import classes from "./dashboard.module.css";

const Dashboard = () => {
  const [isReload, setIsReload] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getDocs(collection(db, "expenses")).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          newData.sort((a, b) => {
            return b.expenseDate - a.expenseDate;
          });
          setExpenses(newData);
          setIsReload(false);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err, err.message);
      }
    };

    fetchData();
  }, [isReload]);

  if (IsLoading) {
    return <Loader />;
  }

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
