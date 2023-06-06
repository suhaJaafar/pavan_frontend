import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import Input from '../../../component/Input';
import Table from '../../../component/Table';

export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    medicinal_materials: '',
    count: '',
    buy_price: '',
    note:'',
  });

  useEffect(() => {
    api
      .get(`/expenses/${id}`)
      .then((res) => {
        const expenseData = res.data;
        // const userRole = userData.role ? userData.role : '';
        setExpense((prevExpense) => ({
          ...prevExpense,
          medicinal_materials: expenseData.medicinal_materials,
          count: expenseData.count,
          buy_price: expenseData.buy_price,
          note: expenseData.note,

        //   role: userRole,
        }));
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  const handleMedicinalMaterialsChange = (e) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      medicinal_materials: e.target.value,
    }));
  };

  const handleCountChange = (e) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      count: e.target.value,
    }));
  };
  const handleBuyPriceChange = (e) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      buy_price: e.target.value,
    }));
  };
  const handleNoteChange = (e) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      note: e.target.value,
    }));
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedUser = { ...user, role_name: user.role };
//     api
//       .post(`/user/${id}`, updatedUser)
//       .then((res) => {
//         // User updated successfully
//         console.log('User updated:', res.data);
//         // Navigate back to the users list
//         navigate('/admin-users');
//       })
//       .catch((error) => {
//         console.error('Error updating user:', error);
//       });
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExpense = { ...expense };
    api
      .put(`/expenses/${id}`, updatedExpense)
      .then((res) => {
        // User updated successfully
        console.log('User updated:', res.data);
        // Navigate back to the users list
        navigate(-1);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };


  return (
    <Layout>
      <div>
        <h1 className="font-bold text-2xl">Edit Expense</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label>
            <span className=" font-bold">Medicinal materials:</span>
            <Input
              handleChange={handleMedicinalMaterialsChange}
              value={expense.medicinal_materials}
              labelText="medicinal materials:"
              labelFor="medicinal_materials"
              id="medicinal_materials"
              name="medicinal_materials"
              type="text"
              isRequired={false}
              placeholder="Enter your medicinal materials"
              customClass="your-custom-class"
            />
          </label>
          <br />
          <label>
            <span className=" font-bold">Count:</span>

            <Input
              handleChange={handleCountChange}
              value={expense.count}
              labelText="count:"
              labelFor="count"
              id="count"
              name="count"
              type="number"
              isRequired={false}
              placeholder="Enter your count"
              customClass="your-custom-class"
            />
          </label>
          <br />

          <label>
            <span className=" font-bold">Buy price:</span>

            <Input
              handleChange={handleBuyPriceChange}
              value={expense.buy_price}
              labelText="buy_price:"
              labelFor="buy_price"
              id="buy_price"
              name="buy_price"
              type="number"
              isRequired={false}
              placeholder="Enter your buy_price"
              customClass="your-custom-class"
            />
          </label>
          <br />
          <label>
            <span className=" font-bold">Note:</span>

            <Input
              handleChange={handleNoteChange}
              value={expense.note}
              labelText="note:"
              labelFor="note"
              id="note"
              name="note"
              type="text"
              isRequired={false}
              placeholder="Enter your cnoteount"
              customClass="your-custom-class"
            />
          </label>
          <br />


          <br />
          <button className=" bg-cyan-500 border-cyan-600 px-4 py-2 rounded-md text-white" type="submit">Update Expense</button>
        </form>
      </div>
    </Layout>
  );

}
