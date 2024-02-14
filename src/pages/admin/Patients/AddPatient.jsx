import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import Input from '../../../component/Input';
import Swal from 'sweetalert2';

export default function AddPatient() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    name: '',
    age: '',
    address: '',
    number: '',
    health_status: '',
    visits_one: '',
    visits_two: '',
    visits_three: '',
    visits_four: '',
    price: '',
    status: '',
    appointment: '',
    x_rays: null,
    doctor_name: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0] || '';
    setPatient((prevPatient) => ({
      ...prevPatient,
      x_rays: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', patient.name);
      formData.append('age', patient.age);
      formData.append('number', patient.number);
      formData.append('address', patient.address);
      formData.append('health_status', patient.health_status);
      formData.append('visits_one', patient.visits_one);
      formData.append('visits_two', patient.visits_two);
      formData.append('visits_three', patient.visits_three);
      formData.append('visits_four', patient.visits_four);
      formData.append('price', patient.price);
      formData.append('status', patient.status);
      formData.append('appointment', patient.appointment);
      if (patient.x_rays !== null) {
        formData.append('x_rays', patient.x_rays);
      }      formData.append('doctor_name', patient.doctor_name);
      formData.append('note', patient.note);

      const response = await api.post('/patients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Patient added successfully!',
        showConfirmButton: false,
        customClass: {
            container: ' p-1 sm:p-1',
            icon: 'text-xs sm:text-xs',
            title: 'sm:text-base text-sm font-bold text-teal-500 p-1 sm:p-1',
            content: 'sm:text-sm text-xs text-teal-600 p-1 sm:p-1',
            confirmButton: ' text-white rounded-md p-1 sm:p-1',
          },
        timer: 3000
      }).then(() => {
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      // Handle error if patient creation fails
    }
  };
  return (
    <Layout className="">
      <div  className="sm:m-2 mt-20">
        <h1 className=" font-bold sm:text-2xl text-base">Add Patient</h1>
        <br />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Input
              handleChange={handleChange}
              value={patient.name}
              labelText="Name"
              id="name"
              name="name"
              type="text"
              isRequired={true}
              placeholder="Enter name"
            />
          <Input
            handleChange={handleChange}
            value={patient.appointment}
            labelText="Appointment"
            id="appointment"
            name="appointment"
            type="date"
            isRequired={true}
            placeholder="appointment"
          />
          <Input
            handleChange={handleChange}
            value={patient.age}
            labelText="Age"
            id="age"
            name="age"
            type="text"
            isRequired={true}
            placeholder="Enter age"
          />
<Input
            handleChange={handleChange}
            value={patient.number}
            labelText="Number"
            id="number"
            name="number"
            type="text"
            isRequired={true}
            placeholder="Enter phone number of patient"
          />

            <Input
            handleChange={handleChange}
            value={patient.address}
            labelText="Address"
            id="address"
            name="address"
            type="text"
            isRequired={true}
            placeholder="Enter address"
          />

            <Input
            handleChange={handleChange}
            value={patient.health_status}
            labelText="health status"
            id="health_status"
            name="health_status"
            type="text"
            isRequired={true}
            placeholder="Status health of patient ? "
          />

            <Input
            handleChange={handleChange}
            value={patient.visits_one}
            labelText="Visit One"
            id="visits_one"
            name="visits_one"
            type="text"
            isRequired={false}
            placeholder="Visit One"
          />

            <Input
            handleChange={handleChange}
            value={patient.visits_two}
            labelText="Visit Two"
            id="visits_two"
            name="visits_two"
            type="text"
            isRequired={false}
            placeholder="Visit Two"
          />

            <Input
            handleChange={handleChange}
            value={patient.visits_three}
            labelText="Visit Three"
            id="visits_three"
            name="visits_three"
            type="text"
            isRequired={false}
            placeholder="Visit Three"
          />

            <Input
            handleChange={handleChange}
            value={patient.visits_four}
            labelText="Visit Four"
            id="visits_four"
            name="visits_four"
            type="text"
            isRequired={false}
            placeholder="Visit Four"
          />

            <Input
            handleChange={handleChange}
            value={patient.price}
            labelText="Price"
            id="price"
            name="price"
            type="text"
            isRequired={true}
            placeholder="Price"
          />
<label>
            <select
              name="status"
              id="status"
              value={patient.status}
              onChange={handleChange}
              className="sm:w-auto w-30 sm:px-3 px-2 sm:py-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select status</option>
              <option value="Visitor">Visitor</option>
              <option value="Patient">Patient</option>
            </select>
          </label>
          <br></br>
          <br></br>

<label>
            <span className="font-bold sm:text-lg  text-xs">X-rays Image:</span>
            <Input
              handleChange={handleImageChange}
              labelText="X-rays Image"
              id="x_rays"
              name="x_rays"
              type="file"
              isRequired={false}
              placeholder="X-rays image"
            />
          </label>
          <Input
            handleChange={handleChange}
            value={patient.doctor_name}
            labelText="Name Doctor"
            id="doctor_name"
            name="doctor_name"
            type="text"
            isRequired={true}
            placeholder="Name Doctor"
          />

            <Input
            handleChange={handleChange}
            value={patient.note}
            labelText="Notes"
            id="note"
            name="note"
            type="text"
            isRequired={false}
            placeholder="Notes"
          />
<button  className=" bg-teal-500 border-teal-600 sm:px-4 px-2 sm:py-2 py-1  sm:text-lg text-sm mb-2 rounded-md text-white" type="submit">Add Patient</button>
         </form>
       </div>
          </Layout>

    );
  }
