import React, { useState, useEffect } from 'react';
import api from './api/api';
import Layout from "./layout/Layout";
function AdminAccount() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/user');
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>

    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Render other profile information as needed */}
    </div>
    </Layout>

  );
}

export default AdminAccount;
