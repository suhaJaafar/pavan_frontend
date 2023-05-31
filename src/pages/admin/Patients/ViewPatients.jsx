import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../layout/Layout';
import api from '../../../api/api';
import Table from '../../../component/Table';
import Input from '../../../component/Input';

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api
      .get('/patients')
      .then((res) => {
        setPatients(res.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeletePatient = (patientId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this patient?');
    if (confirmDelete) {
      api
        .delete(`/patients/${patientId}`)
        .then((res) => {
          // patient deleted successfully
          console.log(`patient with ID ${patientId} deleted.`);
          // Update the patients state by removing the deleted patient
          setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== patientId));
        })
        .catch((error) => {
          console.error('Error deleting patient:', error);
        });
    }
  };

  const handleEditPatient = (patientId) => {
    navigate(`/patient/${patientId}/edit`);
  };

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleViewPatients = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const filteredPatients = patients.filter(
    (patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.age.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.ststus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'patientrname',
        Cell: ({ row }) => <span>{row.index + 1}</span>, // Use row.index to display the incrementing count
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Status',
        accessor: 'health_status',
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex gap-2">
            <Link to={`/patient/${value}`} className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded">
              View
            </Link>

            <Link
              to={`/patient/${value}/edit`} // Replace with the appropriate edit patient route
              className=" bg-gray-500 hover:bg-gray-600 text-white  py-2 px-4  rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDeletePatient(value)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="my-4 mx-auto max-w-2xl">
        <div className="flex justify-end mb-4">
          <Link
            to="/add-patient" // Replace with the appropriate add patient route
            className="bg-teal-300 hover:bg-teal-400 text-white py-4 px-6 rounded"
          >
            Add New patient
          </Link>
        </div>
        <h2 className="text-xl font-bold mb-4">patient List</h2>
        <Input
          handleChange={handleSearchChange}
          value={searchQuery}
          labelText="Search:"
          labelFor="search"
          id="search"
          name="search"
          type="text"
          placeholder="Search"
        />
        <Table columns={columns} data={filteredPatients} />
      </div>
    </Layout>
  );
}
