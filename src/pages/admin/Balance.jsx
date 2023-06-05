import React, { useEffect, useState } from 'react';
import Layout from "../../layout/Layout";
import api from "../../api/api";
import Table from "../../component/Table";
import BgPatient from '../../assets/bg_patients.jpg';

export default function Balance() {
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    api.get('/balance')
      .then((res) => {
        setBalance(res.data);
      })
      .catch((error) => {
        console.error('Error fetching balance:', error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Amount',
        accessor: 'total_balance',
      },
      {
        Header: 'Date',
        accessor: 'updated_at',
        Cell: ({ value }) => {
          const formattedDate = new Date(value).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            hour12: false,
          });
          return <span>{formattedDate}</span>;
        },
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="w-full bg-gray-50 grid rounded-lg shadow-lg">
          <div className="grid justify-items-center h-20 w-full rounded-t-lg bg-cover" style={{ backgroundImage: `url(${BgPatient})` }}>
              <div className="pt-6 justify-self-center">
                <h1 className="text-gray-800 block font-sans text-2xl font-semibold leading-tight tracking-normalantialiased">Balance </h1>
              </div>
          </div>
          <div className="p-2">
            {balance.map((item) => (
              <div className='grid justify-items-center items-center' key={item.id}>
                <p className=' justify-self-start text-sm'>
                  <span className="font-bold pr-2">Date:</span>
                  {item.updated_at}
                </p>
                <div className='text-lg pb-4'><p>
                  <span className="font-bold pr-2">Amount:</span> {item.total_balance}
                </p></div>


              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );



}
