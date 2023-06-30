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
        const calculatedExpense = { ...res.data, totalCost: res.data.count * res.data.buy_price };
        setExpense(calculatedExpense);
      })
      .catch((error) => {
        console.error('Error fetching expense details:', error);
      });
  }, [id]);

  if (!expense) {
    return <Layout><div className='pl-4'>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="flex justify-center items-center sm:m-2 mt-20">
        <div className="w-full bg-gray-50 grid gap-5 rounded-lg shadow-lg">
          <div className="grid justify-items-center h-36 w-full rounded-t-lg bg-cover bg-gradient-to-br from-yellow-200 from-5% via-teal-300 via-50% to-teal-400 to-80%">
            <div className=''>
              <div className='pt-14 justify-self-center'><h1 className="text-gray-100 block font-sans text-2xl font-semibold leading-tight tracking-normalantialiased">
                Expense Details
              </h1></div>
            </div>
          </div>
          <div className='p-2 sm:text-lg text-base'>
            <p><span className='font-bold'>Date:</span> {expense.created_at}</p>
            <p><span className='font-bold'>Medicinal Materials:</span> {expense.medicinal_materials}</p>
            <p><span className='font-bold'>Count:</span> {expense.count}</p>
            <p><span className='font-bold'>Buy Price:</span> {expense.buy_price}</p>
            <p><span className='font-bold'>Total Cost:</span> {expense.totalCost}</p>
            <p className=''><span className='font-bold'>Note:</span> {expense.note}</p>

          </div>
        </div>
      </div>
    </Layout>
  );
}
