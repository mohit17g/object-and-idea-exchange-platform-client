import React, { useState } from "react";
import Expenses from "./Expenses/Expenses";
import NewExpense from "./NewExpenses/NewExpense";
import "./Ess.scss";
let DUMMY_EXPENSE = [
];

function Ess() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);
  const addExpenseHandler = (expense) => {
    const updatedExpense = [expense, ...expenses];
    setExpenses(updatedExpense);
  };
  return (
    <div className="ess">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses item={expenses} />
    </div>
  );
}

export default Ess;
