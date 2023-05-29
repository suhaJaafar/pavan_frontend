import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

const GetUserById = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get(`/user/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default GetUserById;
