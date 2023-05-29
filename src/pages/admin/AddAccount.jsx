import React, { useState } from 'react';
import api from '../../api/api';
import Input from '../../component/Input';
import Layout from '../../layout/Layout';
import { useNavigate } from 'react-router-dom';


export default function AddAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await api.post('/register', {
          name,
          email,
          password,
          role_id: roleId,
        });

        console.log(response.data);
        navigate(-1);

        setName('');
        setEmail('');
        setPassword('');
        setRoleId('');
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
          <Input
            handleChange={(e) => setRoleId(e.target.value)}
            value={roleId}
            labelText="Role ID"
            id="roleId"
            name="roleId"
            type="text"
            isRequired={true}
            placeholder="Enter role ID"
          />
          <button type="submit">Add Account</button>
        </form>
      </div>
          </Layout>

    );
  }
