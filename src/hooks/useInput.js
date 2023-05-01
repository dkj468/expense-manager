import { useState } from "react";

const useInput = (modelObj, errorObj) => {
  const [modelState, setModelState] = useState(modelObj);
  const [errorState, setErrorState] = useState(errorObj);

  const validateInput = (name, value) => {
    const output = { isError: false, error: "" };
    switch (name) {
      case "expenseName":
        if (value === "") {
          return { isError: true, error: "Please provide an expense name" };
        }
        return output;
      case "expenseAmount":
        if (value * 1 <= 0) {
          return { isError: true, error: "Please provide an expense amount" };
        }
        return output;
      case "expenseAccount":
        if (value * 1 < 0) {
          return { isError: true, error: "Please provide an expense account" };
        }
        return output;
      default:
        return output;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const {error } = validateInput(name, value);
    setErrorState({
      ...errorState,
      [name]: error,
    });
    setModelState({
      ...modelState,
      [name]: value,
    });
  };

  return { modelState, errorState, handleChange };
};

export default useInput;
