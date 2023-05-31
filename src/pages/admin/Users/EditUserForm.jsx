import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import Input from '../../../component/Input';
import Table from '../../../component/Table';

export default function EditUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'secretary', label: 'Secretary' },
  ];

  useEffect(() => {
    api
      .get(`/user/${id}`)
      .then((res) => {
        const userData = res.data;
        const userRole = userData.role ? userData.role : '';
        setUser((prevUser) => ({
          ...prevUser,
          name: userData.name,
          email: userData.email,
          role: userRole,
        }));
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id]);


  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      role: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, role_name: user.role };
    api
      .post(`/user/${id}`, updatedUser)
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
        <h1 className="font-bold text-2xl">Edit User</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label>
            <span className=" font-bold">Name:</span>
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
            <span className=" font-bold">Email:</span>

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
          <label className="flex items-center">
  <span className="mr-2 font-bold">Role:</span>
  <select
    name="role"
    value={user.role}
    onChange={handleChange}
    required
    className="w-32 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select Role</option>
    {roleOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</label>


          <br />
          <button className=" bg-cyan-500 border-cyan-600 px-4 py-2 rounded-md text-white" type="submit">Update User</button>
        </form>
      </div>
    </Layout>
  );

}