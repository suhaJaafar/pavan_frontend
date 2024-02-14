import React, { useEffect, useState } from 'react';
import Layout from "../../layout/Layout";
import api from "../../api/api";
import Table from "../../component/Table";
import BgPatient from '../../assets/backgroundUseDetails.jpeg';

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
  if (!balance) {
    return <Layout> <div className='pl-4'>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="flex justify-center items-center sm:m-20 m-8 mt-20">
        <div className="w-full bg-gray-50 grid rounded-lg shadow-lg">
          <div className="grid justify-items-center h-20 w-full rounded-t-lg bg-cover bg-gradient-to-br from-yellow-200 from-5% via-teal-300 via-50% to-teal-400 to-80% ">
              <div className="pt-6 justify-self-center">
                <h1 className=" text-gray-100 block font-sans sm:text-2xl text-base font-semibold leading-tight tracking-normalantialiased">Balance </h1>
              </div>
          </div>
          <div className="p-2">
            {balance.map((item) => (
              <div className='grid justify-items-center items-center' key={item.id}>
                <p className=' justify-self-start sm:pb-0 pb-4 sm:text-sm text-xs'>
                  <span className="font-bold pr-2">Date:</span>
                  {item.updated_at}
                </p>
                <div className='text-lg pb-4'><p>
                  <span className="font-bold sm:text-base text-sm  pr-2">Amount:</span> {item.total_balance}
                </p></div>


              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );



}
