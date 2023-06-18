// import React, { useState, useEffect } from 'react';
// import Layout from "../../layout/Layout";
// import { BsPeople, BsHeartPulse } from "react-icons/bs";
// import doctorImage from "../../assets/doctor-stethoscope-icon-free-vector.png";
// import api from '../../api/api';
// import Table from '../../component/Table';
// import { Link} from 'react-router-dom';

// export default function AdminDashboard() {
//   const [counts, setCounts] = useState({
//     users: 0,
//     patients: 0,
//     doctors: 0
//   });

//   const [lastPatients, setLastPatients] = useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userResponse = await api.get('/users/count');
//         const patientResponse = await api.get('/patients/count');
//         const doctorResponse = await api.get('/doctors/count');
//       const lastPatientsResponse = await api.get('/patients/last', { params: { limit: 5 } });

//         const userCount = userResponse.data.count;
//         const patientCount = patientResponse.data.count;
//         const doctorCount = doctorResponse.data.count;
//         const lastPatientsData = lastPatientsResponse.data;

//         startCountIncrement(userCount, patientCount, doctorCount);
//         setLastPatients(lastPatientsData);

//       } catch (error) {
//         console.error('Error fetching counts:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const startCountIncrement = (userCount, patientCount, doctorCount) => {
//     const userIncrement = Math.ceil(userCount / 100); // Divide the count by the number of increments (e.g., 100)
//     const patientIncrement = Math.ceil(patientCount / 100);
//     const doctorIncrement = Math.ceil(doctorCount / 100);

//     let currentUsers = 0;
//     let currentPatients = 0;
//     let currentDoctors = 0;

//     const interval = setInterval(() => {
//       if (currentUsers < userCount) {
//         currentUsers += userIncrement;
//         if (currentUsers > userCount) {
//           currentUsers = userCount;
//         }
//       }

//       if (currentPatients < patientCount) {
//         currentPatients += patientIncrement;
//         if (currentPatients > patientCount) {
//           currentPatients = patientCount;
//         }
//       }

//       if (currentDoctors < doctorCount) {
//         currentDoctors += doctorIncrement;
//         if (currentDoctors > doctorCount) {
//           currentDoctors = doctorCount;
//         }
//       }

//       setCounts({
//         users: currentUsers,
//         patients: currentPatients,
//         doctors: currentDoctors
//       });

//       if (currentUsers === userCount && currentPatients === patientCount && currentDoctors === doctorCount) {
//         clearInterval(interval);
//       }
//     }, 10);
//   };

//   const { users, patients, doctors } = counts;

//   return (
//     <Layout>
//         <div className=''>
//       <div className="flex flex-row gap-6 p-10 justify-center">
//         <div className="flex flex-row gap-3 bg-white p-12 rounded-lg shadow-lg">
//           <div className="flex items-center justify-center rounded-full w-16 h-16  text-white bg-gradient-to-br  from-yellow-700 to-teal-500 ">
//             <span className="text-3xl font-bold"><BsPeople /></span>
//           </div>
//           <div className="flex items-center">
//             <div className="ml-3">
//               <h3 className="text-lg font-semibold">{users}</h3>
//               <p className='text-xl'>Users</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-row gap-3 bg-white p-12 rounded-lg shadow-lg">
//           <div className="flex items-center justify-center bg-gradient-to-br  text-white from-yellow-700 to-teal-500 rounded-full w-16 h-16 text-white">
//             <span className="text-3xl font-bold"><BsHeartPulse /></span>
//           </div>
//           <div className="flex items-center">
//             <div className="ml-3">
//               <h3 className="text-lg font-semibold">{patients}</h3>
//               <p className='text-xl'>Patients</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-row gap-3 bg-white p-12 rounded-lg shadow-lg">
//           <div className="flex items-center justify-center text-white bg-gradient-to-br from-yellow-700 to-teal-500  rounded-full w-16 h-16">
//             <img
//               className=""
//               src={doctorImage}
//               alt="doctors"
//             />
//           </div>
//           <div className="flex items-center">
//             <div className="ml-3">
//               <h3 className="text-lg font-semibold">{doctors}</h3>
//               <p className='text-xl'>Doctors</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='p-8'>
//         <h2 className=' text-2xl text-teal-800'>Last Patients:</h2>
//         <Table
//           columns={[
//             {
//               Header: 'Name',
//               accessor: 'name',
//             },
//             {
//               Header: 'Health Status',
//               accessor: 'health_status',
//             },
//             {
//               Header: 'Address',
//               accessor: 'address',
//             },
//             {
//                 Header: 'Actions',
//                 accessor: 'actions', // Assign a unique accessor value for the Actions column
//                 Cell: ({ row }) => (
//                   <div className="flex gap-2">
//                 <Link
//                   to={`/patient/${row.original.id}`}
//                   className="bg-yellow-700 hover:bg-yellow-800 text-white py-2 px-2 rounded"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                 </Link>

//               </div>
//             ),
//           },
//           ]}
//           data={lastPatients}
//         />
//       </div>
//       </div>
//     </Layout>
//   );
// }








import React, { useState, useEffect } from 'react';
import Layout from "../../layout/Layout";
import { BsPeople, BsHeartPulse } from "react-icons/bs";
import doctorImage from "../../assets/doctor-stethoscope-icon-free-vector.png";
import api from '../../api/api';
import Table from '../../component/Table';
import { Link} from 'react-router-dom';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    patients: 0,
    doctors: 0
  });

  const [lastPatients, setLastPatients] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get('/users/count');
        const patientResponse = await api.get('/patients/count');
        const doctorResponse = await api.get('/doctors/count');
      const lastPatientsResponse = await api.get('/patients/last', { params: { limit: 5 } });

        const userCount = userResponse.data.count;
        const patientCount = patientResponse.data.count;
        const doctorCount = doctorResponse.data.count;
        const lastPatientsData = lastPatientsResponse.data;

        startCountIncrement(userCount, patientCount, doctorCount);
        setLastPatients(lastPatientsData);

      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchData();
  }, []);

  const startCountIncrement = (userCount, patientCount, doctorCount) => {
    const userIncrement = Math.ceil(userCount / 100); // Divide the count by the number of increments (e.g., 100)
    const patientIncrement = Math.ceil(patientCount / 100);
    const doctorIncrement = Math.ceil(doctorCount / 100);

    let currentUsers = 0;
    let currentPatients = 0;
    let currentDoctors = 0;

    const interval = setInterval(() => {
      if (currentUsers < userCount) {
        currentUsers += userIncrement;
        if (currentUsers > userCount) {
          currentUsers = userCount;
        }
      }

      if (currentPatients < patientCount) {
        currentPatients += patientIncrement;
        if (currentPatients > patientCount) {
          currentPatients = patientCount;
        }
      }

      if (currentDoctors < doctorCount) {
        currentDoctors += doctorIncrement;
        if (currentDoctors > doctorCount) {
          currentDoctors = doctorCount;
        }
      }

      setCounts({
        users: currentUsers,
        patients: currentPatients,
        doctors: currentDoctors
      });

      if (currentUsers === userCount && currentPatients === patientCount && currentDoctors === doctorCount) {
        clearInterval(interval);
      }
    }, 10);
  };

  const { users, patients, doctors } = counts;

  // Function to truncate the health status based on device type
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

  // Function to check if the device is a mobile device
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  return (
    <Layout>
      <div className="">
      <div className="flex sm:flex-row flex-col gap-4 p-10 mx-auto w-72 justify-center justify-items-center">
          <div className="flex flex-row gap-3 bg-white p-4 w-48  sm:w-auto sm:p-12 rounded-lg shadow-lg">
            <div className="flex items-center justify-center rounded-full w-12 h-12 sm:w-16 sm:h-16 text-white bg-gradient-to-br from-yellow-700 to-teal-500">
              <span className="text-xl sm:text-3xl font-bold"><BsPeople /></span>
            </div>
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="text-base sm:text-lg font-semibold">{users}</h3>
                <p className='text-sm sm:text-xl'>Users</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-3 bg-white p-4  w-48  sm:w-auto sm:p-12 rounded-lg shadow-lg">
            <div className="flex items-center justify-center text-white bg-gradient-to-br from-yellow-700 to-teal-500 rounded-full w-12 h-12 sm:w-16 sm:h-16">
              <span className="text-xl sm:text-3xl font-bold"><BsHeartPulse /></span>
            </div>
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="text-base sm:text-lg font-semibold">{patients}</h3>
                <p className='text-sm sm:text-xl'>Patients</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-3 bg-white p-4  w-48  sm:w-auto sm:p-12 rounded-lg shadow-lg">
            <div className="flex items-center justify-center text-white bg-gradient-to-br from-yellow-700 to-teal-500 rounded-full w-12 h-12 sm:w-16 sm:h-16">
              <img
                className=""
                src={doctorImage}
                alt="doctors"
              />
            </div>
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="text-base sm:text-lg font-semibold">{doctors}</h3>
                <p className='text-sm sm:text-xl'>Doctors</p>
              </div>
            </div>
          </div>
        </div>

        <div className='p-6'>
          <h2 className='text-md sm:text-2xl text-teal-800'>Last Patients:</h2>
          <Table
            columns={[
              {
                Header: 'Name',
                accessor: 'name',
              },
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
                Header: 'Address',
                accessor: 'address',
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
            ]}
            data={lastPatients}
          />
        </div>
      </div>
    </Layout>
  );

        }
