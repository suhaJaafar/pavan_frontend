import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Layout from "../../layout/Layout";
import Input from "../../component/Input";
import Table from "../../component/Table";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
