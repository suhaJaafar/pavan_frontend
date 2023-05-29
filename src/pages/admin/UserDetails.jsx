import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import Layout from '../../layout/Layout';

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

    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {user.role && <p>Role: {user.role.name}</p>}
      {/* Add more details as needed */}
    </div>
    </Layout>

  );
}
