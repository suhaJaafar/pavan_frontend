import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import { UserIcon } from '@heroicons/react/solid';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get(`/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <Layout>
      <div className=" bg-white w-1/2 shadow-md rounded-lg p-6 grid justify-center ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-teal-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div className="">
          <p className="mb-2">
            <span className="font-bold">Name:</span> {user.name}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {user.email}
          </p>
          {user.role && (
            <p className="mb-2">
              <span className="font-bold">Role:</span> {user.role.name}
            </p>
          )}
          {/* Add more details as needed */}
        </div>
      </div>
    </Layout>
  );
}
