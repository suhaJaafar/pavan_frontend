import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import Layout from "../../../layout/Layout";
import Input from "../../../component/Input";
import Table from "../../../component/Table";
import { Link, useNavigate } from 'react-router-dom';


export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteExpense = (expenseId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
      api
        .delete(`/expenses/${expenseId}`)
        .then((res) => {
          // User deleted successfully
          console.log(`Expense with ID ${expenseId} deleted.`);
          // Update the users state by removing the deleted user
          setExpenses((prevExpense) => prevExpense.filter((expense) => expense.id !== expenseId));
        })
        .catch((error) => {
          console.error('Error deleting expense:', error);
        });
    }
  };
  const columns = [
    {
      Header: 'Medicinal Materials',
      accessor: 'medicinal_materials',
    },
    {
      Header: 'Count',
      accessor: 'count',
    },
    {
      Header: 'Buy Price',
      accessor: 'buy_price',
    },
    {
      Header: 'Note',
      accessor: 'note',
    },
    {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex gap-2">
            <Link to={`/expenses/${value}`}  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            </Link>

            <Link
              to={`/expenses/${value}/edit`} // Replace with the appropriate edit user route
              className=" bg-gray-500 hover:bg-gray-600 text-white  py-2 px-2  rounded"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            </Link>
            <button
              onClick={() => handleDeleteExpense(value)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </button>
          </div>
        ),
      },
  ];

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.medicinal_materials.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="my-4 mx-auto max-w-2xl">
      <div className="flex justify-end mb-4">
          <Link
            to="/add-expense"
            className=" text-lg flex items-center gap-2 bg-teal-300 hover:bg-teal-400 text-white py-2 px-4 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className=" h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New User
          </Link>
        </div>
        <h2 className="text-xl font-bold mb-4">Expenses List</h2>
        <Input
          handleChange={handleSearchChange}
          value={searchQuery}
          labelText="Search:"
          labelFor="search"
          id="search"
          name="search"
          type="text"
          placeholder="Search"
        />
        <Table columns={columns} data={filteredExpenses} />
      </div>
    </Layout>
  );
}