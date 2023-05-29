import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Layout from '../../layout/Layout';
import Input from '../../component/Input';
import Table from '../../component/Table';

export default function EditUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    role_id: '', // Change 'role' to 'role_id'
  });

  useEffect(() => {
    api
      .get(`/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post(`/user/${id}`, user)
      .then((res) => {
        // User updated successfully
        console.log('User updated:', res.data);
        // Navigate back to the users list
        navigate('/admin-users');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Layout>
      <div>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <Input
              handleChange={handleChange}
              value={user.name}
              labelText="Name:"
              labelFor="name"
              id="name"
              name="name"
              type="text"
              isRequired={true}
              placeholder="Enter your name"
              customClass="your-custom-class"
            />
          </label>
          <br />
          <label>
            Email:
            <Input
              handleChange={handleChange}
              value={user.email}
              labelText="Email:"
              labelFor="email"
              id="email"
              name="email"
              type="email"
              isRequired={true}
              placeholder="Enter your email"
              customClass="your-custom-class"
            />
          </label>
          <br />
          <label>
            Role ID:
            <Input
              handleChange={handleChange}
              value={user.role_id}
              labelText="Role ID:"
              labelFor="role_id"
              id="role_id"
              name="role_id"
              type="text"
              isRequired={true}
              placeholder="Enter role ID"
              customClass="your-custom-class"
            />
          </label>
          <br />
          <button type="submit">Update User</button>
        </form>
      </div>
    </Layout>
  );

}
