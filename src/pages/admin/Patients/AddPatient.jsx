import React, { useState } from 'react';
import api from '../../../api/api';
import Input from '../../../component/Input';
import Layout from '../../../layout/Layout';
import { useNavigate } from 'react-router-dom';


export default function AddPatient() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [health_status, setHealthStatus] = useState('');
    const [visits_one, setVisitsOne] = useState('');
    const [visits_two, setVisitsTwo] = useState('');
    const [visits_three, setVisitsThree] = useState('');
    const [visits_four, setVisitsFour] = useState('');
    const [price, setPrice] = useState('');
    const [x_rays, setXRays] = useState(null);
    const [doctor_name, setDoctorName] = useState('');
    const [note, setNote] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('age', age);
          formData.append('number', number);
          formData.append('address', address);
          formData.append('health_status', health_status);
          formData.append('visits_one', visits_one);
          formData.append('visits_two', visits_two);
          formData.append('visits_three', visits_three);
          formData.append('visits_four', visits_four);
          formData.append('price', price);
          formData.append('x_rays', x_rays); // Append the file object
          formData.append('doctor_name', doctor_name);
          formData.append('note', note);

          const response = await api.post('/patients', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type to enable file upload
            },
          });

          console.log(response.data);
          navigate(-1);

          // Reset state values
          setName('');
          setAge('');
          setNumber('');
          setAddress('');
          setHealthStatus('');
          setVisitsOne('');
          setVisitsTwo('');
          setVisitsThree('');
          setVisitsFour('');
          setPrice('');
          setXRays(null); // Reset to null
          setDoctorName('');
          setNote('');
        } catch (error) {
          console.error(error);
          // Handle error if patient creation fails
        }
      };

    return (
        <Layout>
      <div>
        <h2>Add Patient</h2>
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
            handleChange={(e) => setAge(e.target.value)}
            value={age}
            labelText="Age"
            id="age"
            name="age"
            type="text"
            isRequired={true}
            placeholder="Enter age"
          />

            <Input
            handleChange={(e) => setNumber(e.target.value)}
            value={number}
            labelText="Number"
            id="number"
            name="number"
            type="text"
            isRequired={true}
            placeholder="Enter phone number of patient"
          />

            <Input
            handleChange={(e) => setAddress(e.target.value)}
            value={address}
            labelText="Address"
            id="address"
            name="address"
            type="text"
            isRequired={true}
            placeholder="Enter address"
          />

            <Input
            handleChange={(e) => setHealthStatus(e.target.value)}
            value={health_status}
            labelText="health status"
            id="health_status"
            name="health_status"
            type="text"
            isRequired={true}
            placeholder="Status health of patient ? "
          />

            <Input
            handleChange={(e) => setVisitsOne(e.target.value)}
            value={visits_one}
            labelText="Visit One"
            id="visits_one"
            name="visits_one"
            type="text"
            isRequired={true}
            placeholder="Visit One"
          />

            <Input
            handleChange={(e) => setVisitsTwo(e.target.value)}
            value={visits_two}
            labelText="Visit Two"
            id="setVisitsTwo"
            name="setVisitsTwo"
            type="text"
            isRequired={false}
            placeholder="Visit Two"
          />

            <Input
            handleChange={(e) => setVisitsThree(e.target.value)}
            value={visits_three}
            labelText="Visit Three"
            id="visits_three"
            name="visits_three"
            type="text"
            isRequired={false}
            placeholder="Visit Three"
          />

            <Input
            handleChange={(e) => setVisitsFour(e.target.value)}
            value={visits_four}
            labelText="Visit Four"
            id="visits_four"
            name="visits_four"
            type="text"
            isRequired={false}
            placeholder="Visit Four"
          />

            <Input
            handleChange={(e) => setPrice(e.target.value)}
            value={price}
            labelText="Price"
            id="price"
            name="price"
            type="text"
            isRequired={true}
            placeholder="Price"
          />

            <Input
                handleChange={(e) => setXRays(e.target.files[0])}
                labelText="x_rays image"
                id="x_rays"
                name="x_rays"
                type="file"
                isRequired={false}
                placeholder="x_rays image"
            />

            <Input
            handleChange={(e) => setDoctorName(e.target.value)}
            value={doctor_name}
            labelText="Name Doctor"
            id="doctor_name"
            name="doctor_name"
            type="text"
            isRequired={true}
            placeholder="Name Doctor"
          />

            <Input
            handleChange={(e) => setNote(e.target.value)}
            value={note}
            labelText="Notes"
            id="note"
            name="note"
            type="text"
            isRequired={false}
            placeholder="Notes"
          />
          <button  className=" bg-cyan-500 border-cyan-600 px-4 py-2 rounded-md text-white" type="submit">Add Patient</button>
        </form>
      </div>
          </Layout>

    );
  }
