// import React, { useState } from 'react';
// import api from '../../../api/api';
// import Input from '../../../component/Input';
// import Layout from '../../../layout/Layout';
// import { useNavigate } from 'react-router-dom';


// export default function AddPatient() {
//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');
//     const [number, setNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [health_status, setHealthStatus] = useState('');
//     const [visits_one, setVisitsOne] = useState('');
//     const [visits_two, setVisitsTwo] = useState('');
//     const [visits_three, setVisitsThree] = useState('');
//     const [visits_four, setVisitsFour] = useState('');
//     const [price, setPrice] = useState('');
//     const [x_rays, setXRays] = useState(null);
//     const [doctor_name, setDoctorName] = useState('');
//     const [note, setNote] = useState('');

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const formData = new FormData();
//           formData.append('name', name);
//           formData.append('age', age);
//           formData.append('number', number);
//           formData.append('address', address);
//           formData.append('health_status', health_status);
//           formData.append('visits_one', visits_one);
//           formData.append('visits_two', visits_two);
//           formData.append('visits_three', visits_three);
//           formData.append('visits_four', visits_four);
//           formData.append('price', price);
//           formData.append('x_rays', x_rays && x_rays[0]); // Correct: Append the file data
//           formData.append('doctor_name', doctor_name);
//           formData.append('note', note);
//           const selectedFile = x_rays && x_rays[0];
//           formData.append('x_rays', selectedFile); // Append the file data

//           console.log('Form Data:', formData); // Log the form data
//           const response = await api.post('/patients', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });

//           console.log(response.data);
//           navigate(-1);

//           // Reset state values
//           setName('');
//           setAge('');
//           setNumber('');
//           setAddress('');
//           setHealthStatus('');
//           setVisitsOne('');
//           setVisitsTwo('');
//           setVisitsThree('');
//           setVisitsFour('');
//           setPrice('');
//           setXRays(null); // Reset to null
//           setDoctorName('');
//           setNote('');
//         }catch (error) {
//             if (error.response && error.response.status === 422) {
//               const errors = error.response.data.errors;
//               console.log(errors); // Log the errors to the console
//               console.log(error.response.data); // Log the full error response
//             } else {
//               console.error(error);
//               // Handle other types of errors
//             }
//           }

//       };

//     return (
//         <Layout>
//       <div>
//         <h2>Add Patient</h2>
//         <form onSubmit={handleSubmit}>
//           <Input
//             handleChange={(e) => setName(e.target.value)}
//             value={name}
//             labelText="Name"
//             id="name"
//             name="name"
//             type="text"
//             isRequired={true}
//             placeholder="Enter name"
//           />

//             <Input
//             handleChange={(e) => setAge(e.target.value)}
//             value={age}
//             labelText="Age"
//             id="age"
//             name="age"
//             type="text"
//             isRequired={true}
//             placeholder="Enter age"
//           />

//             <Input
//             handleChange={(e) => setNumber(e.target.value)}
//             value={number}
//             labelText="Number"
//             id="number"
//             name="number"
//             type="text"
//             isRequired={true}
//             placeholder="Enter phone number of patient"
//           />

//             <Input
//             handleChange={(e) => setAddress(e.target.value)}
//             value={address}
//             labelText="Address"
//             id="address"
//             name="address"
//             type="text"
//             isRequired={true}
//             placeholder="Enter address"
//           />

//             <Input
//             handleChange={(e) => setHealthStatus(e.target.value)}
//             value={health_status}
//             labelText="health status"
//             id="health_status"
//             name="health_status"
//             type="text"
//             isRequired={true}
//             placeholder="Status health of patient ? "
//           />

//             <Input
//             handleChange={(e) => setVisitsOne(e.target.value)}
//             value={visits_one}
//             labelText="Visit One"
//             id="visits_one"
//             name="visits_one"
//             type="text"
//             isRequired={true}
//             placeholder="Visit One"
//           />

//             <Input
//             handleChange={(e) => setVisitsTwo(e.target.value)}
//             value={visits_two}
//             labelText="Visit Two"
//             id="setVisitsTwo"
//             name="setVisitsTwo"
//             type="text"
//             isRequired={false}
//             placeholder="Visit Two"
//           />

//             <Input
//             handleChange={(e) => setVisitsThree(e.target.value)}
//             value={visits_three}
//             labelText="Visit Three"
//             id="visits_three"
//             name="visits_three"
//             type="text"
//             isRequired={false}
//             placeholder="Visit Three"
//           />

//             <Input
//             handleChange={(e) => setVisitsFour(e.target.value)}
//             value={visits_four}
//             labelText="Visit Four"
//             id="visits_four"
//             name="visits_four"
//             type="text"
//             isRequired={false}
//             placeholder="Visit Four"
//           />

//             <Input
//             handleChange={(e) => setPrice(e.target.value)}
//             value={price}
//             labelText="Price"
//             id="price"
//             name="price"
//             type="text"
//             isRequired={true}
//             placeholder="Price"
//           />

// <Input
//   handleChange={(e) => setXRays(e.target.files[0])}
//   labelText="x_rays image"
//   id="x_rays"
//   name="x_rays"
//   type="file"
//   isRequired={true} // Set isRequired to true for the file input
//   placeholder="x_rays image"
// />

//             <Input
//             handleChange={(e) => setDoctorName(e.target.value)}
//             value={doctor_name}
//             labelText="Name Doctor"
//             id="doctor_name"
//             name="doctor_name"
//             type="text"
//             isRequired={true}
//             placeholder="Name Doctor"
//           />

//             <Input
//             handleChange={(e) => setNote(e.target.value)}
//             value={note}
//             labelText="Notes"
//             id="note"
//             name="note"
//             type="text"
//             isRequired={false}
//             placeholder="Notes"
//           />
//           <button  className=" bg-cyan-500 border-cyan-600 px-4 py-2 rounded-md text-white" type="submit">Add Patient</button>
//         </form>
//       </div>
//           </Layout>

//     );
//   }





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import Input from '../../../component/Input';

export default function AddPatientForm() {
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
      formData.append('x_rays', patient.x_rays);
      formData.append('doctor_name', patient.doctor_name);
      formData.append('note', patient.note);

      const response = await api.post('/patients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      navigate('/patients'); // Redirect to the patients list page
    } catch (error) {
      console.error(error);
      // Handle error if patient creation fails
    }
  };
  return (
    <Layout className="justify-items-center">
      <div>
        <h1 className="font-bold text-2xl">Add Patient</h1>
        <br />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            <span className="font-bold">Name:</span>
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
          </label>
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
            isRequired={true}
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
            <span className="font-bold">X-rays Image:</span>
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
<button  className=" bg-cyan-500 border-cyan-600 px-4 py-2 rounded-md text-white" type="submit">Add Patient</button>
         </form>
       </div>
          </Layout>

    );
  }
