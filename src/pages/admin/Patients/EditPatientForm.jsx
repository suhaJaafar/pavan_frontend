import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import Input from '../../../component/Input';

export default function EditPatientForm() {
  const { id } = useParams();
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

  useEffect(() => {
    api
      .get(`/patient/${id}`)
      .then((res) => {
        // Replace "null" strings with actual null values
        const cleanedPatient = Object.entries(res.data).reduce((acc, [key, value]) => {
          acc[key] = value === 'null' ? null : value;
          return acc;
        }, {});
        setPatient(cleanedPatient);
      })
      .catch((error) => {
        console.error('Error fetching patient details:', error);
      });
  }, [id]);




const handleNameChange = (e) => {
    const value = e.target.value || "";
    // Check if the value is null or undefined
    const updatedValue = value !== null ? value : null;

    setPatient((prevPatient) => ({
      ...prevPatient,
      name: updatedValue,
    }));
  };
  const handleAgeChange = (e) => {
    const value = e.target.value || null;

    setPatient((prevPatient) => ({
      ...prevPatient,
      age: value,
    }));
};
    const handleAddressChange = (e) => {
        const value = e.target.value || null;

        setPatient((prevPatient) => ({
          ...prevPatient,
          address:value,
        }));
    };
        const handleNumberChange = (e) => {
            const value = e.target.value || null;

            setPatient((prevPatient) => ({
              ...prevPatient,

              number:value,
            }));
        };
            const handleHealthStatusChange = (e) => {
                const value = e.target.value || null;

                setPatient((prevPatient) => ({
                  ...prevPatient,
                  health_status:value,
                }));
  };
  const handleVisitsOneChange = (e) => {

    const value = e.target.value || null;

    setPatient((prevPatient) => ({
      ...prevPatient,
      visits_one: value,
    }));
};
const handleVisitsTwoChange = (e) => {
    const value = e.target.value || "";
// Check if the value is null or undefined
const updatedValue = value !== null ? value : null;
    setPatient((prevPatient) => ({
      ...prevPatient,
      visits_two:updatedValue,
    }));
};
const handleVisitsThreeChange = (e) => {
    const value = e.target.value || "";
// Check if the value is null or undefined
const updatedValue = value !== null ? value : null;
    setPatient((prevPatient) => ({
      ...prevPatient,
      visits_three:updatedValue,
    }));
};
const handleVisitsFourChange = (e) => {
    const value = e.target.value || "";
// Check if the value is null or undefined
const updatedValue = value !== null ? value : null;
    setPatient((prevPatient) => ({
      ...prevPatient,
      visits_four:updatedValue,
    }));
};
const handlePriceChange = (e) => {
    const value = e.target.value || "";
// Check if the value is null or undefined
const updatedValue = value !== null ? value : null;
    setPatient((prevPatient) => ({
      ...prevPatient,
      price:updatedValue,
    }));
};

  const handleImageChange = (e) => {
    const file = e.target.files[0] || "";
    const updatedValue = file !== null ? file : null;

    setPatient((prevPatient) => ({
      ...prevPatient,
      x_rays: updatedValue,
    }));
  };
  const handleDoctorNameChange = (e) => {
    const value = e.target.value || "";
    const updatedValue = value !== null ? value : null;

    setPatient((prevPatient) => ({
      ...prevPatient,
      doctor_name:updatedValue,
    }));
};
const handleNoteChange = (e) => {
    const value = e.target.value || "";
// Check if the value is null or undefined
const updatedValue = value !== null ? value : null;
    setPatient((prevPatient) => ({
      ...prevPatient,
      note:updatedValue,
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
        formData.append('visits_two', patient.visits_two !== null ? patient.visits_two : '');
        formData.append('visits_three', patient.visits_three !== null ? patient.visits_three : '');
        formData.append('visits_four', patient.visits_four !== null ? patient.visits_four : '');
        formData.append('price', patient.price !== null ? patient.price : '');
        formData.append('x_rays', patient.x_rays);
        formData.append('doctor_name', patient.doctor_name);
        formData.append('note', patient.note !== null ? patient.note : '');
      const response = await api.post(`/patient/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      navigate(-1);
    } catch (error) {
      console.error(error);
      // Handle error if patient update fails
    }
  };

  return (
    <Layout className="justify-items-center">
      <div>
        <h1 className="font-bold text-2xl">Edit Patient</h1>
        <br />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>
              <span className="font-bold">Name:</span>
              <Input
                handleChange={handleNameChange}
                value={patient.name}
                labelText="Name"
                id="name"
                name="name"
                type="text"
                isRequired={true}
                placeholder="Enter name"
              />
            </label>
            <label>
              <span className="font-bold">age:</span>
              <Input
                handleChange={handleAgeChange}
                value={patient.age}
                labelText="age"
                id="age"
                name="age"
                type="number"
                isRequired={true}
                placeholder="Enter name"
              />
            </label>
            <label>
              <span className="font-bold">Address:</span>
              <Input
                handleChange={handleAddressChange}
                value={patient.address}
                labelText="Address"
                id="address"
                name="address"
                type="text"
                isRequired={false}
                placeholder="Enter address"
                customClass="your-custom-class"
              />
            </label>
            <label>
              <span className="font-bold">Doctor Name:</span>
              <Input
                handleChange={handleDoctorNameChange}
                value={patient.doctor_name}
                labelText="Doctor Name"
                id="doctor_name"
                name="doctor_name"
                type="text"
                isRequired={true}
                placeholder="Enter Name of doctor"
                customClass="your-custom-class"
              />
            </label>

            <label>
              <span className="font-bold">Number:</span>
              <Input
                handleChange={handleNumberChange}
                value={patient.number}
                labelText="Number"
                id="number"
                name="number"
                type="number"
                isRequired={true}
                placeholder="Enter number"
                customClass="your-custom-class"
              />
            </label>
            <label>
              <span className="font-bold">Health Status:</span>
              <Input
                handleChange={handleHealthStatusChange}
                value={patient.health_status}
                labelText="Health Status"
                id="health_status"
                name="health_status"
                type="text"
                isRequired={false}
                placeholder="Enter health status"
                customClass="your-custom-class"
              />
            </label>
            <label>
              <span className="font-bold">Visits One:</span>
              <Input
                handleChange={handleVisitsOneChange}
                value={patient.visits_one}
                labelText="Visits One"
                id="visits_one"
                name="visits_one"
                type="text"
                isRequired={false}
                placeholder="Enter visits one"
                customClass="your-custom-class"
              />
            </label>
            <label>
              <span className="font-bold">Visits Two:</span>
              <Input
                handleChange={handleVisitsTwoChange}
                value={patient.visits_two}
                labelText="Visits Two"
                id="visits_two"
                name="visits_two"
                type="text"
                isRequired={false}
                placeholder="Enter visits two"
                customClass="your-custom-class"
              />
            </label>
            <label>
              <span className="font-bold">Visits Three:</span>
              <Input
                handleChange={handleVisitsThreeChange}
                value={patient.visits_three}
                labelText="Visits Three"
                id="visits_three"
                name="visits_three"
                type="text"
                isRequired={false}
                placeholder="Enter visits three"
                customClass="your-custom-class"
              />
            </label>
            <label>
              <span className="font-bold">Visits Four:</span>
              <Input
                handleChange={handleVisitsFourChange}
                value={patient.visits_four}
                labelText="Visits Four"
                id="visits_four"
                name="visits_four"
                type="text"
                isRequired={false}
                placeholder="Enter visits four"
                customClass="your-custom-class"
              />
            </label>
            <label>
              <span className="font-bold">price:</span>
              <Input
                handleChange={handlePriceChange}
                value={patient.price}
                labelText="price"
                id="price"
                name="price"
                type="number"
                isRequired={true}
                placeholder="Enter price"
                customClass="your-custom-class"
              />
            </label>
            <Input
              handleChange={handleImageChange}
              labelText="X-rays Image"
              id="x_rays"
              name="x_rays"
              type="file"
              isRequired={false}
              placeholder="x_rays image"
            />
            <label>
              <span className="font-bold">Note :</span>
              <Input
                handleChange={handleNoteChange}
                value={patient.note}
                labelText="Note"
                id="note"
                name="note"
                type="text"
                isRequired={false}
                placeholder="Note..."
                customClass="your-custom-class"
              />
            </label>
            <button
              className="bg-cyan-500 border-cyan-600 px-4 py-2 rounded-md text-white"
              type="submit"
            >
              Update Patient
            </button>
          </form>
        </div>
      </Layout>

  );
}
