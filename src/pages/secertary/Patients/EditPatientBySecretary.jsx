import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import Input from '../../../component/Input';
import Swal from 'sweetalert2';

export default function EditPatientBySecretary() {
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
    appointment: '',
    x_rays: null,
    doctor_name: '',
    note: '',
  });
  const statusOptions = [
    { value: 'Visitor', label: 'Visitor' },
    { value: 'Patient', label: 'Patient' },
  ];
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
const handleStatusChange = (e) => {
    const value = e.target.value || null;

    setPatient((prevPatient) => ({
      ...prevPatient,
      status: value,
    }));
};


const handleAppointmentChange = (e) => {
    const value = e.target.value || null;

    setPatient((prevPatient) => ({
      ...prevPatient,
      appointment: value,
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
        formData.append('status', patient.status);
        formData.append('appointment', patient.appointment);
        formData.append('x_rays', patient.x_rays);
        formData.append('doctor_name', patient.doctor_name);
        formData.append('note', patient.note !== null ? patient.note : '');
      const response = await api.post(`/patient/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Patienrt updated successfully!',
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
        // Navigate back to the users list
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      // Handle error if patient update fails
    }
  };

  return (
    <Layout>
      <div className='sm:m-2 mt-20'>
        <h1 className="font-bold sm:text-xl text-base">Edit Patient</h1>
        <br />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>
              <span className="font-bold sm:text-base text-sm">Name:</span>
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
              <span className="font-bold sm:text-base text-sm">age:</span>
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
  <span className="font-bold sm:text-base text-sm">Appointment:</span>
  <Input
    handleChange={handleAppointmentChange}
    value={patient.appointment}
    labelText="Appointment"
    id="appointment"
    name="appointment"
    type="date"
    isRequired={true}
    placeholder="Enter appointment"
    customClass="your-custom-class"
  />
</label>

            <label>
              <span className="font-bold sm:text-base text-sm">Address:</span>
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
              <span className="font-bold sm:text-base text-sm">Doctor Name:</span>
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
              <span className="font-bold sm:text-base text-sm">Number:</span>
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
              <span className="font-bold sm:text-base text-sm">Health Status:</span>
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
              <span className="font-bold sm:text-base text-sm">Visits One:</span>
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
              <span className="font-bold sm:text-base text-sm">Visits Two:</span>
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
              <span className="font-bold sm:text-base text-sm">Visits Three:</span>
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
              <span className="font-bold sm:text-base text-sm">Visits Four:</span>
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
              <span className="font-bold sm:text-base text-sm">price:</span>
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
            <label>
            <span className="font-bold sm:text-lg text-xs">Status:</span>
            <select
              name="status"
              id="status"
              value={patient.status}
              onChange={handleStatusChange}
              className="sm:w-auto w-30 sm:px-3 px-2 sm:py-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select status</option>
              {statusOptions.map((option) => (
                <option  className='text-xs sm:text-base sm:px-4 px-1' key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <br></br>
          <br></br>
            <label>
            <span className="font-bold sm:text-base text-sm">X-rays Image:</span>
            <Input
                handleChange={handleImageChange}
                labelText="X-rays Image"
                id="x_rays"
                name="x_rays"
                type="file"
                isRequired={false}
                placeholder="x_rays image"
                />
            </label>

            <label>
              <span className="font-bold sm:text-base text-sm">Note :</span>
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
              className="bg-teal-500 mb-2 border-teal-600 sm:px-4 px-2 sm:py-2 py-2 sm:text-lg text-sm rounded-md text-white"
              type="submit"
            >
              Update Patient
            </button>
          </form>
        </div>
      </Layout>

  );
}
