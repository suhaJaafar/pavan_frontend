import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import Input from '../../../component/Input';
import Swal from 'sweetalert2';

const Edit = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    profileImg: '',
    age: '',
    phoneNumber: '',
    onlineDays: '',
    onlineHours: '',
    selectedImage: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await api.get('/profile');
        const { name, profile_img, age, phone_number, online_days, online_hours } = response.data;
        setDoctor({
          name,
          profileImg: profile_img,
          age,
          phoneNumber: phone_number,
          onlineDays: online_days,
          onlineHours: online_hours,
          selectedImage: null,
        });
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchDoctorProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      selectedImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, age, phoneNumber, onlineDays, onlineHours, selectedImage } = doctor;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('phone_number', phoneNumber);
      formData.append('online_days', onlineDays);
      formData.append('online_hours', onlineHours);
      if (selectedImage) {
        formData.append('profile_img', selectedImage);
      }

      await api.post('/doctor/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'user updated successfully',
        showConfirmButton: false,
        customClass: {
            container: ' p-1 sm:p-1',
            icon: 'text-xs sm:text-xs',
            title: 'sm:text-base text-sm font-bold text-teal-500 p-1 sm:p-1',
            content: 'sm:text-sm text-xs text-teal-600 p-1 sm:p-1',
            confirmButton: ' text-white rounded-md p-1 sm:p-1',
          },
        timer: 3000
      })
      navigate(-1);
      console.log('Doctor profile updated successfully');
    } catch (error) {
      console.error('Error updating doctor profile:', error);
    }
  };

  return (
    <Layout>
      <div className='sm:m-4 mt-20'>
        <h1 className='font-bold sm:text-2xl text-base'>Edit Doctor Profile</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <Input type="text" name="name" value={doctor.name} handleChange={handleInputChange}/>
          </div>
          <div>
            <label>Profile Image:</label>
            <Input
              handleChange={handleImageChange}
              labelText="Profile Image"
              id="profileImg"
              name="profileImg"
              type="file"
              isRequired={false}
              placeholder="Profile Image"
            />
          </div>
          <div>
            <label>Age:</label>
            <Input
              handleChange={handleInputChange}
              labelText="age"
              value={doctor.age}
              id="age"
              name="age"
              type="number"
              isRequired={false}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <Input
              type="text"
              name="phoneNumber"
              id="phone_number"
              value={doctor.phoneNumber}
              handleChange={handleInputChange}
            />
          </div>
        <div>
          <label>Online Days:</label>
          <Input type="text" value={doctor.onlineDays} name="onlineDays" id="online_days" handleChange={handleInputChange}/>
        </div>
        <div>
          <label>Online Hours:</label>
          <Input type="text" value={doctor.onlineHours} id="online_hours" name="onlineHours" handleChange={handleInputChange} />
        </div>

        <button className="bg-teal-500 border-teal-600 px-4 py-2 rounded-md text-white" type="submit">Save</button>
      </form>
    </div>
    </Layout>
  );
};

export default Edit;
