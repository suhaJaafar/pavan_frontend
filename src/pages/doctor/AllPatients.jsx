import React, { useState, useEffect } from 'react';
import Layout from "../../layout/Layout";
import Table from "../../component/Table";
import api from "../../api/api";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Fetch the logged-in doctor's information
        const doctorResponse = await api.get('/user'); // Replace with your API endpoint for fetching the logged-in doctor's information
        const doctorData = doctorResponse.data;
        const doctorRoleId = doctorData.role_id;

        // Check if the logged-in user is a doctor (role ID 2)
        // if (doctorRoleId !== 2) {
        //   console.log('User is not a doctor.');
        //   setLoading(false);
        //   return;
        // }

        // Fetch all patients
        const patientsResponse = await api.get('/patients'); // Replace with your API endpoint for fetching all patients
        const allPatients = patientsResponse.data;

        // Filter patients based on the doctor's name
        const doctorName = doctorData.name;
        const filteredPatients = allPatients.filter(patient => patient.doctor_name === doctorName);

        setPatients(filteredPatients);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!patients.length) {
    return <p>No patients found.</p>;
  }

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    // Add more columns here as needed
  ];

  return (
    <Layout>
      <div className="text-center">
        <h1 className="serviceMainTitle">ALL PATIENTS</h1>
        <div className="bottom"></div>
        <div>
          <Table columns={columns} data={patients} />
        </div>
      </div>
    </Layout>
  );
};

export default AllPatients;
