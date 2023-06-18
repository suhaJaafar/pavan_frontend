// import React, { useState, useEffect } from 'react';
// import Layout from '../../layout/Layout';
// import Table from '../../component/Table';
// import api from '../../api/api';
// import { Link, useNavigate } from 'react-router-dom';

// const PatientsList = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await api.get('/patients/doctors');
//         setPatients(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//         setError('Error fetching patients. Please try again later.');
//       }
//     };

//     fetchPatients();
//   }, []);



//   if (error) {
//     return <p>{error}</p>;
//   }

//   const columns = [
//     { Header: 'Id', accessor: 'id' },
//     { Header: 'Name', accessor: 'name' },
//     { Header: 'Price', accessor: 'price' },
//     {
//         Header: 'Health Status',
//         accessor: 'health_status',
//         Cell: ({ value }) => (
//           <p className="text-sm sm:text-xl">
//             {truncateHealthStatus(value)}
//           </p>
//         ),
//       },      {
//             Header: 'Actions',
//             accessor: 'actions',
//             Cell: ({ row }) => (
//               <div className="flex gap-2">
//             <Link
//               to={`/patient/${row.original.id}`}
//               className="bg-yellow-700 hover:bg-yellow-800 text-white py-2 px-2 rounded"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             </Link>
//           </div>
//         ),
//       },
//   ];
// // Function to truncate the health status based on device type
// const truncateHealthStatus = (status) => {
//     const words = status.split(' ');

//     if (words.length > 5) {
//       if (isMobileDevice()) {
//         return words.slice(0, 2).join(' ') + '...';
//       } else {
//         return words.slice(0, 5).join(' ') + '...';
//       }
//     }

//     return status;
//   };

//   // Function to check if the device is a mobile device
//   const isMobileDevice = () => {
//     return /Mobi|Android/i.test(navigator.userAgent);
//   };
//   if (loading) {
//     return <Layout><p className='pl-4'>Loading...</p></Layout>;
//   }
//   return (
//     <Layout>
//       <div className="my-4 mx-auto max-w-2xl">
//         <h1 className="serviceMainTitle">MY PATIENTS</h1>
//         <div className="">
//           <Table className="w-full" columns={columns} data={patients} />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default PatientsList;

import React, { useState, useEffect } from 'react';
import Layout from '../../layout/Layout';
import Table from '../../component/Table';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import Input from '../../component/Input';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get(`/patients/doctors?page=${currentPage}`);
        setPatients(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError('Error fetching patients. Please try again later.');
      }
    };

    fetchPatients();
  }, [currentPage]);

  // Filter patients based on search query
  const filteredPatients = patients.filter((patient) => {
    const id = String(patient.id) || ''; // convert id to a string
    const name = patient.name || ''; // handle undefined name
    const age = patient.age || ''; // handle undefined age

    return (
      id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      age.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (error) {
    return <p>{error}</p>;
  }

  const columns = [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Price', accessor: 'price' },
    {
      Header: 'Health Status',
      accessor: 'health_status',
      Cell: ({ value }) => (
        <p className="text-sm sm:text-xl">
          {truncateHealthStatus(value)}
        </p>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            to={`/patient/${row.original.id}`}
            className="bg-yellow-700 hover:bg-yellow-800 text-white py-2 px-2 rounded"
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
        </div>
      ),
    },
  ];

  const truncateHealthStatus = (status) => {
    const words = status.split(' ');

    if (words.length > 5) {
      if (isMobileDevice()) {
        return words.slice(0, 2).join(' ') + '...';
      } else {
        return words.slice(0, 5).join(' ') + '...';
      }
    }

    return status;
  };

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  if (loading) {
    return <Layout><p className='pl-4'>Loading...</p></Layout>;
  }

  // Calculate pagination variables
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const endIndex = startIndex + patientsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="my-4 mx-auto max-w-2xl pt-10 sm:pt-0">
        <h1 className="serviceMainTitle">MY PATIENTS</h1>
        <div className="">
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
          <Table className="w-full" columns={columns} data={paginatedPatients} />
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              className={`${
                currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
              } text-white py-2 px-2 rounded`}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              className={`${
                currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
              } text-white py-2 px-2 rounded`}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientsList;
