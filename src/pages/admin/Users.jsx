import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import api from '../../api/api';
import Table from '../../component/Table';
import Input from '../../component/Input';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api
      .get('/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      api
        .delete(`/user/${userId}`)
        .then((res) => {
          // User deleted successfully
          console.log(`User with ID ${userId} deleted.`);
          // Update the users state by removing the deleted user
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleViewUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'username',
        Cell: ({ row }) => <span>{row.index + 1}</span>, // Use row.index to display the incrementing count
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role.name',
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex gap-2">
            <Link to={`/user/${value}`} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
              View
            </Link>

            <Link
              to={`/users/${value}/edit`} // Replace with the appropriate edit user route
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDeleteUser(value)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="my-4 mx-auto max-w-2xl">
        <div className="flex justify-end mb-4">
          <Link
            to="/add-account" // Replace with the appropriate add user route
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Add New User
          </Link>
        </div>
        <h2 className="text-xl font-bold mb-4">Users List</h2>
        <Input
          handleChange={handleSearchChange}
          value={searchQuery}
          labelText="Search:"
          labelFor="search"
          id="search"
          name="search"
          type="text"
          placeholder="Search"
        />
        <Table columns={columns} data={filteredUsers} />
      </div>
    </Layout>
  );
}
