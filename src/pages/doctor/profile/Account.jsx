import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import Layout from "../../../layout/Layout";
import backgroundImage from '../../../assets/backgroundUseDetails.jpeg';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook


function Account() {
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate(); // Get the history object


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
    const handleEdit = () => {
        // Navigate to the edit profile page or open a modal for editing
        navigate('/doctor/profile/edit'); // Replace '/edit-profile' with the desired edit profile route
      };

    if (!doctor) {
        return <Layout><p>Loading...</p></Layout>;
      }

    return (
                <Layout>

<div  className="items-center flex-col w-full h-auto  bg-cover bg-white rounded-lg">
    <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-lg bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        >
        <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[100px] w-[100px] items-center justify-center rounded-full border-[4px] border-white bg-gray-300">
        {doctor.profile_img ? (
            <img
              src={`http://localhost:8000/storage/profile_img/image/${doctor.profile_img}`}
              alt="User Profile"
              className="w-full h-full rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-36 h-36 text-teal-400 stroke-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
      </div>
      <div className='p-4 text-lg grid gap-3'>
        <p><span className=' font-bold'>Name:</span> {doctor.name}</p>
        <p><span className=' font-bold'>Age: </span>{doctor.age}</p>
        <p><span className=' font-bold'>Phone Number:</span> {doctor.phone_number}</p>
        <p><span className=' font-bold'>Online Days:</span> {doctor.online_days}</p>
        <p><span className=' font-bold'>Online Hours:</span> {doctor.online_hours}</p>
        <p><span className=' font-bold'>Balance:</span> {doctor.balance}</p>
        <button  className=" bg-cyan-500 border-cyan-600 px-6 py-2 rounded-md text-white w-24" onClick={handleEdit} type="submit">Edit</button>

        </div>
        </div>

        </Layout>

    );

}

export default Account;
