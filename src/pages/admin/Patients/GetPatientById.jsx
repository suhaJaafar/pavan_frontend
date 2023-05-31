import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';

export default function GetPatientById() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    api
      .get(`/patient/${id}`)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

  return (
    <Layout>
      <div>
        <h2>Patient Details</h2>
        <p>Name: {patient.name}</p>
        <p>Age: {patient.age}</p>
        <p>Address: {patient.address}</p>
        <p>Health Status: {patient.health_status}</p>
        <p>Visits One: {patient.visits_one}</p>
        <p>Visits Two: {patient.visits_two}</p>
        <p>Visits Three: {patient.visits_three}</p>
        <p>Visits Four: {patient.visits_four}</p>
        <p>Price: {patient.price}</p>
        <p>Doctor Name: {patient.doctor_name}</p>
        <p>Note: {patient.note}</p>
        {patient.x_rays && (
          <div>
            <h3>X-rays</h3>
            <img src={`http://localhost:8000/storage/x_rays/image/${patient.x_rays}`} alt="X-rays" />

          </div>
        )}
      </div>
    </Layout>
  );
}
