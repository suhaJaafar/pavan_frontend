import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import BgPatient from '../../../assets/bg_patients.jpg';
export default function GetPatientById() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

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
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  if (!patient) {
    return
    <Layout>
        <div className='pl-4'>Loading...</div></Layout>;
  }
//  style={{ backgroundImage: `url(${BgPatient})` }}
  return (
    <Layout>
        <div className="flex justify-center items-center m-2">
      <div className="w-full bg-gray-50 grid gap-5 rounded-lg shadow-lg ">
      <div className=" text-white grid grid-cols-3 justify-items-center h-36 w-full rounded-t-lg bg-cover  bg-gradient-to-br from-yellow-200 from-5% via-teal-300 via-50% to-teal-400 to-80% ">
        <div className='pt-20 justify-self-start pl-10'>
            {patient.name && (
              <div>
                <p className="font-bold">Name:<span className=' pl-2 font-normal'>{patient.name}</span></p>
              </div>
            )}
            {patient.age && (
                        <div>
                        <p className="font-bold">Age:<span className=' pl-2 font-normal'>{patient.age}</span></p>
                        </div>
                    )}

            </div>
            <div>
            <h1 className=" text-gray-100 pt-14 block font-sans text-3xl font-semibold leading-tight tracking-normalantialiased ">
                Patient Details
                </h1>
                </div>
                <div  className='pt-20 justify-self-end pr-10'>
                    {patient.created_at && (
                        <div>
                            <p className="font-bold">Date:<span className=' pl-2 font-normal'>{patient.created_at}</span></p>
                        </div>
                    )}
            {patient.doctor_name && (
              <div className=''>
                <p className="font-bold">Doctor Name:<span className=' pl-2 font-normal'>{patient.doctor_name}</span></p>
              </div>
            )}

                </div>
        </div>

        <div className="">

          <div className="grid grid-cols-2 gap-2 mb-4 p-2 px-10">

            {/* col 1 */}
<div className=' space-y-2' > {patient.address && (
                        <div>
                            <p className="font-bold">Address:<span className=' pl-2 font-normal'>{patient.address}</span></p>
                        </div>
                    )}

            {patient.health_status && (
              <div>
                <p className="font-bold">Health Status:<span className=' pl-2 font-normal'>{patient.health_status}</span></p>
              </div>
            )}


          {patient.price && (
            <p>
              <span className="font-bold">Price:</span> {patient.price}
            </p>
          )}

          </div>


            {/* col 2 */}
<div>{patient.x_rays && (
            <div className='flex'>
              <img
                className="w-52 h-auto rounded-md "
                src={`http://127.0.0.1:8000/storage/x_rays/image/${patient.x_rays}`}
                alt="X-rays"
              />
            </div>
          )}

          </div>





                    </div>
          {/* col 2 */}
          <div className='px-10 py-4 space-y-4'>
            <div className='flex'>
              <span className='font-bold w-32 '>Visits One:</span>

                <p className="font-normal ">{patient.visits_one}</p>
              </div>

            {/* {patient.visits_three && ( */}
            <div className='flex'>
              <span className='font-bold w-32 '>Visits Two:</span>
                <p className="font-normal ">{patient.visits_two}</p>
              </div>
             {/* )} */}

            {/* {patient.visits_three && ( */}
              <div className='flex'>
              <span className='font-bold w-32 '>Visits Three:</span>

                <p className="font-normal ">{patient.visits_three}</p>
              </div>
             {/* )} */}
            {/* {patient.visits_four && ( */}
              <div className='flex'>
              <span className='font-bold w-32 '>Visits Four:</span>
                <p className="font-normal ">{patient.visits_four}</p>
              </div>
            {/* )} */}

            {patient.note && (
            <div className="flex">
              <span className="font-bold mr-2">Note:</span>
              <p type="text-area" className="p-4 bg-white rounded-md">{patient.note}</p>
            </div>
          )}
          </div>

        </div>
      </div>
      </div>
    </Layout>
  );
}
