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
        const response = await api.get('/patients/doctors'); // Update the endpoint as per your API
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
  ];

  return (
    <Layout>
      <div className="text-center">
        <h1 className="serviceMainTitle">MY PATIENTS</h1>
        <div className="bottom"></div>
        <div>
          <Table columns={columns} data={patients} />
        </div>
      </div>
    </Layout>
  );
};

export default PatientsList;
