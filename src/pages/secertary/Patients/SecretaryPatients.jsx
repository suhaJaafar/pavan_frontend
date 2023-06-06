import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../layout/Layout';
import api from '../../../api/api';
import Table from '../../../component/Table';
import Input from '../../../component/Input';

export default function SecretaryPatients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  useEffect(() => {
    api
      .get(`/patients?page=${currentPage}`)
      .then((res) => {
        setPatients(res.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, [currentPage]);

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


  const filteredPatients = patients.filter((patient) => {
  const name = patient.name || ''; // handle undefined name
  const age = patient.age || ''; // handle undefined age
  const status = patient.health_status || ''; // handle undefined status

  return (
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    age.toLowerCase().includes(searchQuery.toLowerCase()) ||
    status.toLowerCase().includes(searchQuery.toLowerCase())
  );
});

  const columns = React.useMemo(
    () => [
        {
            Header: 'ID',
            accessor: 'id',
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
            accessor: 'actions', // Assign a unique accessor value for the Actions column
            Cell: ({ row }) => (
              <div className="flex gap-2">
            <Link
              to={`/patient/${row.original.id}`}
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>

            <Link
              to={`/patient/${row.original.id}/edit`}
              className=" bg-gray-500 hover:bg-gray-600 text-white py-2 px-2  rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
            <button
              onClick={() => handleDeletePatient(row.original.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [page, setPage] = useState(0);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const paginatedPatients = filteredPatients.slice(page * pageSize, (page + 1) * pageSize);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <Layout>
      <div className="my-4 mx-auto max-w-2xl">
        <div className="flex justify-end mb-4">
          <Link
            to="/add-patient"
            className=" text-lg flex items-center gap-2 bg-teal-300 hover:bg-teal-400 text-white py-2 px-4 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
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
        <Table columns={columns} data={paginatedPatients} />
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            className={`${
              page === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
            } text-white py-2 px-2 rounded`}
          >
            Previous Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages - 1}
            className={`${
              page === totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
            } text-white py-2 px-2 rounded`}
          >
            Next Page
          </button>
        </div>
      </div>
    </Layout>
  );
}
