import React, { useState, useEffect } from 'react';
import Layout from '../../layout/Layout';
import Table from '../../component/Table';
import api from '../../api/api';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/patients/doctors');
        setPatients(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError('Error fetching patients. Please try again later.');
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <Layout><p>Loading...</p></Layout>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const columns = [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Status', accessor: 'health_status' },
  ];

  return (
    <Layout>
      <div className="my-4 mx-auto max-w-2xl">
        <h1 className="serviceMainTitle">MY PATIENTS</h1>
        <div className="">
          <Table className="w-full" columns={columns} data={patients} />
        </div>
      </div>
    </Layout>
  );
};

export default PatientsList;
