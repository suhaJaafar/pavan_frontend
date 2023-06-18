import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import Input from '../../../component/Input';

const EditAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const INITIAL_STATE = {
    id: 0,
    name: '',
    email: '',
    profile_img: null,
  };

  const [user, setUser] = useState(INITIAL_STATE);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profile_img') {
      setUser((prevUser) => ({
        ...prevUser,
        profile_img: files[0], // Store the file object in the state
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleChange = (e) => {
    handleInput(e);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({
      ...prevUser,
      profile_img: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('profile_img', user.profile_img);

      const response = await api.post(`/user/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('User profile updated:', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <Layout className="justify-items-center">
      <div>
        <h1 className="font-bold text-2xl">Edit Profile</h1>
        <br />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            <span className="font-bold">Name:</span>
            <Input
              handleChange={handleChange}
              value={user.name}
              labelText="Name"
              id="name"
              name="name"
              type="text"
              isRequired={true}
              placeholder="Enter name"
            />
          </label>
          <label>
            <span className="font-bold">Email:</span>
            <Input
              handleChange={handleChange}
              value={user.email}
              labelText="Email"
              id="email"
              name="email"
              type="email"
              isRequired={true}
              placeholder="Enter email"
            />
          </label>
          <Input
            handleChange={handleImageChange}
            labelText="Profile Image"
            id="profile_img"
            name="profile_img"
            type="file"
            isRequired={false}
            placeholder="Profile image"
          />
          <button
            className="bg-teal-500 border-teal-600 px-4 py-2 rounded-md text-white"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditAccount;
