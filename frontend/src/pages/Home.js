import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpensesTable from './ExpensesTable';
import ExpensesTrackerForm from './ExpensesTrackerForm';
import ExpenseDetails from './ExpenseDetails'; // Fix for the ReferenceError

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseAmt, setExpensesAmt] = useState(0);
    const [IncomeAmt, setIncomeAmt] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    useEffect(() => {
        const amounts = expenses.map((item) => item.amount);
        console.log(amounts);

        const Income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        console.log('Income: ', Income)

        // -5000 * -1 = 5000
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        console.log('exp  : ', exp);

        setIncomeAmt(Income);
        setExpensesAmt(exp)
    }, [expenses]);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchExpenses = useCallback(async () => {
        try {
            const url = `${APIUrl}/Expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }, [navigate]);

    const addExpenses = async (data) => {
        try {
            const url = `${APIUrl}/Expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [fetchExpenses]);

    const handleDeleteExpense = async (expenseId) => {
        try {
            const url = `${APIUrl}/Expenses/${expenseId}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'

            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }

    }

    return (
        <div>
            <div className='user-section'>
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <ExpenseDetails
                IncomeAmt={IncomeAmt}
                expenseAmt={expenseAmt} />
            <ExpensesTrackerForm
                addExpenses={addExpenses} />
            <ExpensesTable
                expenses={expenses}
                handleDeleteExpense={handleDeleteExpense} />
            <ToastContainer />
        </div>
    )
}

export default Home