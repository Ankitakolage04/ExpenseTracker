import React from 'react'

function ExpenseDetails({ IncomeAmt, expenseAmt}) {

  console.log(' incomeAmt, expenseAmt  ',IncomeAmt,expenseAmt)
  return (
    <div>
        <div> 
          Your balance is { IncomeAmt - expenseAmt} 
        </div>

        <div className="amounts-container">
            Income
            <span className="income-amount">₹{IncomeAmt}</span> {/* Corrected here */}
            Expense
            <span className="expense-amount">₹{expenseAmt}</span>
        </div>
    </div>
  )
}

export default ExpenseDetails