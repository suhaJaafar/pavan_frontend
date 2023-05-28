import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Layout from "../layout/Layout";

function Account() {
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
      const fetchDoctorProfile = async () => {
        try {
          const response = await api.get('/profile');
          const doctorData = response.data;
          setDoctor(doctorData);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchDoctorProfile();
    }, []);

    if (!doctor) {
      return <div>Loading...</div>;
    }

    return (
                <Layout>

      <div>
        <h2>Doctor Profile</h2>
        <p>Name: {doctor.name}</p>
        <p>Age: {doctor.age}</p>
        <p>Phone Number: {doctor.phone_number}</p>
        <p>Online Days: {doctor.online_days}</p>
        <p>Online Hours: {doctor.online_hours}</p>
        <p>Balance: {doctor.balance}</p>
        {/* Render other doctor information as needed */}
      </div>
              </Layout>

    );

}

export default Account;



// import Layout from "../layout/Layout";

// export default function Account() {
//     return (
//         <Layout>
//             <h1 className="text-2xl text-slate-900 shadow">
//                 This is an Account.
//             </h1>
//         </Layout>
//     );
// }
