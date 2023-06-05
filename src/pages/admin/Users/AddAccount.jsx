import React, { useState } from 'react';
import api from '../../../api/api';
import Input from '../../../component/Input';
import Layout from '../../../layout/Layout';
import { useNavigate } from 'react-router-dom';


export default function AddAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleName, setRoleName] = useState(''); // Use roleName instead of roleId
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await api.post('/register', {
          name,
          email,
          password,
          role_name: roleName,
        });

        console.log(response.data);
        navigate(-1);

        setName('');
        setEmail('');
        setPassword('');
        setRoleName('');
      } catch (error) {
        console.error(error);
        // Handle error if registration fails
      }
    };

    return (
        <Layout>
      <div>

        <h2>Add Account</h2>
        <form onSubmit={handleSubmit}>
          <Input
            handleChange={(e) => setName(e.target.value)}
            value={name}
            labelText="Name"
            id="name"
            name="name"
            type="text"
            isRequired={true}
            placeholder="Enter name"
          />
          <Input
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            labelText="Email"
            id="email"
            name="email"
            type="email"
            isRequired={true}
            placeholder="Enter email"
          />
          <Input
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            labelText="Password"
            id="password"
            name="password"
            type="password"
            isRequired={true}
            placeholder="Enter password"
          />
                <select
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    className="w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                    >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="secretary">Secretary</option>
        </select>
        <br></br>
        <br></br>
          <button className=" bg-gradient-to-r from-teal-200 to-red-700 border-cyan-600 px-4 py-2 rounded-md text-white" type="submit">Add Account</button>
        </form>
      </div>
          </Layout>

    );
  }
