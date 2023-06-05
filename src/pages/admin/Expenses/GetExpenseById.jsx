import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import BgPatient from '../../../assets/bg_patients.jpg';

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
<div className="flex justify-center items-center">
      <div className="w-full bg-gray-50 grid gap-5 rounded-lg shadow-lg ">
      <div className=" grid  justify-items-center h-36 w-full rounded-t-lg bg-cover" style={{ backgroundImage: `url(${BgPatient})` }}>
        <div className=''>
<div className=' pt-14 justify-self-center'><h1 className=" text-gray-800 block font-sans text-2xl font-semibold leading-tight tracking-normalantialiased ">
Expense Details</h1></div>
      </div>
</div>
<div className='p-2 text-lg'>
      <p><span className=' font-bold'>Date:</span> {expense.created_at}</p>
      <p><span className=' font-bold'>medicinal materials:</span> {expense.medicinal_materials}</p>
      <p> <span className=' font-bold'>count:</span>{expense.count}</p>
      <p><span className=' font-bold'>buy price:</span> {expense.buy_price}</p>
      <p> <span className=' font-bold'>note:</span>{expense.note}</p>
      </div>
      </div>
      </div>
    </Layout>

  );
}
