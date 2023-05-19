import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "./authContext";

export const ExpenseContext = React.createContext();

export const ExpenseContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseAccounts, setExpenseAccounts] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchExpenseData = async () => {
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
          const filteredData = newData.filter((el) => el.user === user.uid);
          setExpenses(filteredData);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err, err.message);
      }
    };

    const fetchExpenseAccountData = async () => {
      setIsLoading(true);
      try {
        await getDocs(collection(db, "expenseAccounts")).then(
          (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            const filteredData = newData.filter((el) => el.user === user.uid);
            setExpenseAccounts(filteredData);
            setIsLoading(false);
          }
        );
      } catch (err) {
        console.log(err, err.message);
      }
    };
    if (!user) {
      return;
    }
    fetchExpenseData();
    fetchExpenseAccountData();
  }, [user]);

  const addExpense = (expense) => {
    const tempExpenses = [expense, ...expenses];
    setExpenses(tempExpenses);
  };

  const addExpenseAccount = (expenseAccount) => {
    const tempExpenseAccounts = [expenseAccount, ...expenseAccounts];
    setExpenseAccounts(tempExpenseAccounts);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        expenseAccounts,
        IsLoading,
        addExpense,
        addExpenseAccount,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};
