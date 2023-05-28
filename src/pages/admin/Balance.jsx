import React, { useEffect, useState } from 'react';
import Layout from "../../layout/Layout";
import api from "../../api/api";
import Table from "../../component/Table";

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
      <div className="my-4 mx-auto max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Balance List</h2>
        <Table columns={columns} data={balance} />
      </div>
    </Layout>
  );
}
