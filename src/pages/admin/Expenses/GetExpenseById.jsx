import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';

export default function GetExpenseById() {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    api
      .get(`/expenses/${id}`)
      .then((res) => {
        setExpense(res.data);
      })
      .catch((error) => {
        console.error('Error fetching expense details:', error);
      });
  }, [id]);

  if (!expense) {
    return <div>Loading expense details...</div>;
  }

  return (
    <Layout>

<h1>Expense Details</h1>
      <p>User ID: {expense.id}</p>
      <p>Name: {expense.medicinal_materials}</p>
      <p>Email: {expense.count}</p>
      <p>Email: {expense.buy_price}</p>
      <p>Email: {expense.note}</p>
    </Layout>

  );
}
