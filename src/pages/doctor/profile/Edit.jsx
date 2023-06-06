import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Input from '../../../component/Input';
import Layout from '../../../layout/Layout';

const Edit = () => {
  const [name, setName] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [onlineDays, setOnlineDays] = useState('');
  const [onlineHours, setOnlineHours] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the doctor's profile information
    const fetchDoctorProfile = async () => {
      try {
        const response = await api.get('/profile');
        const { name, profile_img, age, phone_number, online_days, online_hours, balance } = response.data;

        // Set the initial state with the retrieved values
        setName(name);
        setProfileImg(profile_img);
        setAge(age);
        setPhoneNumber(phone_number);
        setOnlineDays(online_days);
        setOnlineHours(online_hours);
        setBalance(balance);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchDoctorProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('phone_number', phoneNumber);
      formData.append('online_days', onlineDays);
      formData.append('online_hours', onlineHours);
      formData.append('balance', balance);
      if (selectedImage) {
        formData.append('profile_img', selectedImage);
      }

      // Send a PUT request to update the doctor's profile
      await api.put('/doctor/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(-1);
      console.log('Doctor profile updated successfully');
    } catch (error) {
      // Handle error
      console.error('Error updating doctor profile:', error);
    }
  };

  return (
    <Layout>
    <div>
      <h2>Edit Doctor Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Profile Image:</label>
          <input type="file" onChange={handleImageChange} />
          <Input
              handleChange={handleImageChange}
              labelText="profile_img Image"
              id="profile_img"
              name="profile_img"
              type="file"
              isRequired={false}
              placeholder="profile_img image"
            />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label>Online Days:</label>
          <input type="text" value={onlineDays} onChange={(e) => setOnlineDays(e.target.value)} />
        </div>
        <div>
          <label>Online Hours:</label>
          <input type="text" value={onlineHours} onChange={(e) => setOnlineHours(e.target.value)} />
        </div>
        <div>
          <label>Balance:</label>
          <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
    </Layout>
  );
};

export default Edit;
