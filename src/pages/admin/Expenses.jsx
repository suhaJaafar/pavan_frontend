import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Layout from "../../layout/Layout";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

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

  return (
    <Layout>
      <div>
        <h2>Expenses List</h2>
        {expenses.map((expense) => (
          <div key={expense.id}>
            <p>Medicinal Materials: {expense.medicinal_materials}</p>
            <p>Count: {expense.count}</p>
            <p>Buy Price: {expense.buy_price}</p>
            <p>Note: {expense.note}</p>
            <hr />
          </div>
        ))}
      </div>
    </Layout>
  );
}
