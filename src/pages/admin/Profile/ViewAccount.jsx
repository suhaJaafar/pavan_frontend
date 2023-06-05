import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import backgroundImage from '../../../assets/backgroundUseDetails.jpeg';

export default function ViewAccount() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <div  className="items-center flex-col w-full h-auto  bg-cover bg-white rounded-lg">
    <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-lg bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        >
        <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[100px] w-[100px] items-center justify-center rounded-full border-[4px] border-white bg-gray-300">
        {user.profile_img ? (
            <img
              src={`http://localhost:8000/storage/profile_img/image/${user.profile_img}`}
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


      <div className="mt-16 flex flex-col items-center">

      </div >
      <div className='p-4'>
                <p className="text-navy-700 text-xl font-bold dark:text-white pb-4">Name:<span className=' font-normal'> {user.name}</span></p>
                    <p className="text-navy-700 text-lg font-bold dark:text-white"> Email: <span className=' font-normal'> {user.email}</span></p>
            <br></br>
      <Link to={`/edit/${user.id}`}>
        <button  className=" bg-cyan-500 border-cyan-600 px-6 py-2 rounded-md text-white" type="submit">Edit</button>
      </Link>
      </div>
    </div>
    </Layout>
  );
}
