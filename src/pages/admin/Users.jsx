import React, { useEffect, useState } from 'react';
import Layout from "../../layout/Layout";
import api from "../../api/api";
import Table from "../../component/Table";
import Input from "../../component/Input";

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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
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
    ],
    []
  );

  return (
    <Layout>
      <div className="my-4 mx-auto max-w-2xl">
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
