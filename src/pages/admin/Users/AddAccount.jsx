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
      <div className='sm:m-2 mt-20'>

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
                    className="sm:w-auto w-30 sm:px-3 px-2 sm:py-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"

                    >
                    <option className='text-sm sm:text-base sm:px-4 px-1' value="">Select Role</option>
                    <option className='text-sm sm:text-base sm:px-4 px-1' value="admin">Admin</option>
                    <option className='text-sm sm:text-base sm:px-4 px-1 ' value="doctor">Doctor</option>
                    <option className='text-sm sm:text-base sm:px-4 px-1 ' value="secretary">Secretary</option>
        </select>
        <br></br>
        <br></br>
          <button className=" bg-teal-400 border-teal-200 sm:px-4 px-2 sm:py-2 py-1 rounded-md text-white" type="submit">Add Account</button>
        </form>
      </div>
          </Layout>

    );
  }
