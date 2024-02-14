import React, { useState } from 'react';
import api from '../../../api/api';
import Input from '../../../component/Input';
import Layout from '../../../layout/Layout';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddExpenses() {
  const [medicinal_materials, setMedicinalMaterials] = useState('');
  const [count, setCount] = useState('');
  const [buy_price, setBuyPrice] = useState('');
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/expenses', {
        medicinal_materials,
        count,
        buy_price,
        note,
      });

      console.log(response.data);
      navigate(-1);

      setMedicinalMaterials('');
      setCount('');
      setBuyPrice('');
      setNote('');
      setErrorMessage('');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Expense added successfully!',
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

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
        setErrorMessage(errorMessage);
      } else {
        const errorMessage = 'An error occurred.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
        setErrorMessage(errorMessage);
      }
    }
  };


    return (
        <Layout>
          <div className='sm:m-2 mt-20'>
            <h2>Add Expense</h2>
            {/* {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>} */}
            <form onSubmit={handleSubmit}>
          <Input
            handleChange={(e) => setMedicinalMaterials(e.target.value)}
            value={medicinal_materials}
            labelText="medicinal materials"
            id="medicinal_materials"
            name="medicinal_materials"
            type="text"
            isRequired={true}
            placeholder="Enter medicinal materials"
          />
          <Input
            handleChange={(e) => setCount(e.target.value)}
            value={count}
            labelText="Count"
            id="count"
            name="count"
            type="number"
            isRequired={true}
            placeholder="Enter count"
          />
          <Input
            handleChange={(e) => setBuyPrice(e.target.value)}
            value={buy_price}
            labelText="buy price"
            id="buy_price"
            name="buy_price"
            type="number"
            isRequired={true}
            placeholder="Enter buy price"
          />
          <Input
            handleChange={(e) => setNote(e.target.value)}
            value={note}
            labelText="Note"
            id="note"
            name="note"
            type="string"
            isRequired={false}
            placeholder="Note..."
          />

          <button className="bg-teal-500 border-teal-600 sm:px-4 px-2 sm:py-2 py-1  sm:text-lg text-sm mb-2 rounded-md text-white" type="submit">Add Expense</button>
        </form>
      </div>
          </Layout>

    );
  }
