import React, { useState } from 'react';
import api from '../../../api/api';
import Input from '../../../component/Input';
import Layout from '../../../layout/Layout';
import { useNavigate } from 'react-router-dom';


export default function AddExpenses() {
    const [medicinal_materials, setMedicinalMaterials] = useState('');
    const [count, setCount] = useState('');
    const [buy_price, setBuyPrice] = useState('');
    const [note, setNote] = useState('');

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
      } catch (error) {
        console.error(error);
        // Handle error if registration fails
      }
    };

    return (
        <Layout>
      <div  className='sm:m-2 mt-20'>
        <h2>Add Expense</h2>
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
