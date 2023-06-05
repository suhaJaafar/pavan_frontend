import {Route, Routes, useParams} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/protectedRoute";
import NotFound from "./pages/error/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import SecretaryDashboard from "./pages/secertary/SecretaryDashboard";
import Users from "./pages/admin/Users/Users";
import Expenses from "./pages/admin/Expenses/Expenses";
import Account from "./pages/Account";
import PatientsList from "./pages/doctor/PatientsList";
import AllPatients from "./pages/doctor/AllPatients";
import AdminAccount from "./pages/admin/Profile/ViewAccount";
import Balance from "./pages/admin/Balance";
import AddAccount from "./pages/admin/Users/AddAccount";
import EditUserForm from "./pages/admin/Users/EditUserForm";
import UserDetails from "./pages/admin/Users/UserDetails";
import ViewPatients from "./pages/admin/Patients/ViewPatients";
import AddPatient from "./pages/admin/Patients/AddPatient";
import EditPatientForm from "./pages/admin/Patients/EditPatientForm";
import GetPatientById from "./pages/admin/Patients/GetPatientById";
import AddExpenses from "./pages/admin/Expenses/AddExpenses";
import GetExpenseById from "./pages/admin/Expenses/GetExpenseById";
import EditExpense from "./pages/admin/Expenses/EditExpense";
import EditAccount from "./pages/admin/Profile/EditAccount";
import ViewAccount from "./pages/admin/Profile/ViewAccount";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

// import Profile from "./pages/doctor/";


export default function App() {
    const { id } = useParams();
    const navigate = useNavigate();
    // const logout = () => {
    //     // Remove the access token from local storage
    //     localStorage.removeItem('access_token');

    //     // Redirect the user to the login page
    //     navigate('/');

    //     // Optional: Perform any additional cleanup or API calls if needed
    //   };


  return (
      <Routes>
          <Route path="/" element={<Login />}/>z
          <Route path="/admin-dashboard" element={<ProtectedRoute component={AdminDashboard} requiredRole="admin"/>}/>
          <Route path="/admin-users" element={<ProtectedRoute component={Users} requiredRole="admin"/>}/>
          <Route path="/balance" element={<ProtectedRoute component={Balance} requiredRole="admin"/>}/>
          <Route path="/add-account" element={<ProtectedRoute component={AddAccount} requiredRole="admin"/>}/>
          {/* <Route path="/user/:id" element={<ProtectedRoute component={GetUserById} requiredRole="admin" />} /> */}
          {/* <Route path="/user/:userId" component={GetUserById} /> */}
          {/* <Route path="/user/:userId" component={GetUserById} /> */}
          <Route path="/users/:id/edit" element={<EditUserForm />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/patient/:id" element={<GetPatientById baseUrl="http://localhost:8000/api" />} />

          {/* <Route path="/profile/:userId" element={<ViewAccount />} /> */}
        {/* <Route path="/profile/:userId/edit" element={<EditAccount />} /> */}

         <Route path="/patients" element={<ProtectedRoute component={ViewPatients} requiredRole="admin"/>}/>
          <Route path="/add-patient" element={<ProtectedRoute component={AddPatient} requiredRole="admin"/>}/>
          <Route path="/patient/:id/edit" element={<ProtectedRoute component={() => <EditPatientForm patientId={id} />} requiredRole="admin" />}/>
            <Route exact path="/viewaccount"element={<ViewAccount />}  />
            <Route exact path="/edit/:id" element={<EditAccount />} />


{/* Expenses */}
        <Route path="/add-expense" element={<ProtectedRoute component={AddExpenses} requiredRole="admin"/>}/>
        <Route path="/expenses/:id" element={<GetExpenseById />} />
        <Route path="/expenses/:id/edit" element={<EditExpense />} />


          <Route path="/admin-expenses" element={<ProtectedRoute component={Expenses} requiredRole="admin"/>}/>
          <Route path="/doctor-dashboard" element={<ProtectedRoute component={DoctorDashboard} requiredRole="doctor" />}/>
          <Route path="/secretary-dashboard" element={<ProtectedRoute component={SecretaryDashboard} requiredRole="secretary" />}/>
          <Route path="/patient-list" element={<ProtectedRoute component={PatientsList} requiredRole="doctor" />} />
          <Route path="/patients" element={<ProtectedRoute component={AllPatients} requiredRole="doctor" />} />
          {/* <Route path="/user" element={<ProtectedRoute component={Profile} requiredRole="doctor" />} /> */}
          {/* <Route path="/account" element={<ProtectedRoute component={AdminAccount} requiredRole="admin"/>}/> */}

          <Route path="/account" element={<Account/>}/>
          <Route path="*" element={<NotFound />} />
      </Routes>
  )
}
