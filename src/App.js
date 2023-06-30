import {Route, Routes, useParams} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/protectedRoute";
import NotFound from "./pages/error/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import SecretaryDashboard from "./pages/secertary/SecretaryDashboard";
import Users from "./pages/admin/Users/Users";
import Expenses from "./pages/admin/Expenses/Expenses";
import Account from "./pages/doctor/profile/Account";
import PatientsList from "./pages/doctor/PatientsList";
// import AllPatients from "./pages/doctor/AllPatients";
// import AdminAccount from "./pages/admin/Profile/ViewAccount";
import Balance from "./pages/admin/Balance";
import AddAccount from "./pages/admin/Users/AddAccount";
import EditUserForm from "./pages/admin/Users/EditUserForm";
import UserDetails from "./pages/admin/Users/UserDetails";
import ViewPatients from "./pages/admin/Patients/ViewPatients";
import Visitor from "./pages/admin/Visitor/Visitor";
import DoctorVisitor from "./pages/doctor/Visitor/DoctorVisitor";
import SecretaryVisitor from "./pages/secertary/Visitor/SecretaryVisitor";
import AddPatient from "./pages/admin/Patients/AddPatient";
import AddPatientBySecretary from "./pages/secertary/Patients/AddPatientBySecretary";
import EditPatientBySecretary from "./pages/secertary/Patients/EditPatientBySecretary";
import EditPatientForm from "./pages/admin/Patients/EditPatientForm";
import GetPatientById from "./pages/admin/Patients/GetPatientById";
import AddExpenses from "./pages/admin/Expenses/AddExpenses";
import GetExpenseById from "./pages/admin/Expenses/GetExpenseById";
import EditExpense from "./pages/admin/Expenses/EditExpense";
import EditAccount from "./pages/admin/Profile/EditAccount";
import ViewAccount from "./pages/admin/Profile/ViewAccount";

import EditSecretaryAccount from "./pages/secertary/Profile/EditSecretaryAccount";
import ViewSecretaryAccount from "./pages/secertary/Profile/ViewSecretaryAccount";
// import { useNavigate } from 'react-router-dom';
import Edit from "./pages/doctor/profile/Edit";
import SecretaryPatients from "./pages/secertary/Patients/SecretaryPatients";
import GetSecretaryPatientById from "./pages/secertary/Patients/GetSecretaryPatientById";


export default function App() {
    const { id } = useParams();
    // const navigate = useNavigate();
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

          <Route path="/users/:id/edit" element={<EditUserForm />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/patient/:id" element={<GetPatientById baseUrl="http://localhost:8000/api" />} />

          {/* <Route path="/patients" element={<ViewPatients/>} />
          <Route path="/add-patient" element={<AddPatient/>}/>
          <Route path="/patient/:id/edit" element={<EditPatientForm patientId={id} />} />
            <Route exact path="/viewaccount"element={<ViewAccount />}  /> */}
            {/* <Route exact path="/edit/:id" element={<EditAccount />} /> */}
          <Route path="/patients" element={<ProtectedRoute component={ViewPatients} requiredRole="admin"/>}/>
           <Route path="/add-patient" element={<ProtectedRoute component={AddPatient} requiredRole="admin"/>}/>
          <Route path="/patient/:id/edit" element={<ProtectedRoute component={() => <EditPatientForm patientId={id} />} requiredRole="admin" />}/>
            <Route exact path="/viewaccount"  element={<ProtectedRoute component={ViewAccount} requiredRole="admin"/>}/>
            <Route exact path="/edit/:id" element={<ProtectedRoute component={EditAccount} requiredRole="admin"/>}/>
          <Route path="/visitors" element={<ProtectedRoute component={Visitor} requiredRole="admin"/>}/>


        {/* Expenses */}
        <Route path="/add-expense" element={<ProtectedRoute component={AddExpenses} requiredRole="admin"/>}/>
        <Route path="/expenses/:id" element={<GetExpenseById />} />
        <Route path="/expenses/:id/edit" element={<EditExpense />} />
        <Route path="/admin-expenses" element={<ProtectedRoute component={Expenses} requiredRole="admin"/>}/>

          {/* doctor routes */}
          <Route path="/doctor-dashboard" element={<ProtectedRoute component={DoctorDashboard} requiredRole="doctor" />}/>
          <Route path="/patient-list" element={<ProtectedRoute component={PatientsList} requiredRole="doctor" />} />
          {/* <Route path="/patients" element={<ProtectedRoute component={AllPatients} requiredRole="doctor" />} /> */}
          {/* <Route path="/edit-account" element={<ProtectedRoute component={Edit} requiredRole="doctor"/>}/> */}
          <Route path="/doctor/profile/edit" element={<ProtectedRoute component={Edit} requiredRole="doctor"/>} />
          <Route path="/doctor-visitors" element={<ProtectedRoute component={DoctorVisitor} requiredRole="doctor"/>}/>

          {/* secretary routes */}
 <Route path="/secretary-dashboard" element={<ProtectedRoute component={SecretaryDashboard} requiredRole="secretary" />}/>
          <Route path="/secretarypatients" element={<ProtectedRoute component={ViewPatients} requiredRole="secretary"/>}/>
           <Route path="/patient/:id" element={ <ProtectedRoute component={GetSecretaryPatientById } requiredRole="secretary"/>}/>
           {/* <Route path="/add-patient" element={<ProtectedRoute component={AddPatient} requiredRole="secretary"/>}/> */}
           <Route path="/add-patient-by-secretary" element={<ProtectedRoute component={AddPatientBySecretary} requiredRole="secretary"/>}/>
           <Route path="/patient/:id/edit-by-secretary" element={<ProtectedRoute component={() => <EditPatientBySecretary patientId={id} />} requiredRole="secretary" />}/>

           {/* <Route path="/patient/:id/edit" element={<ProtectedRoute component={() => <EditPatientForm patientId={id} />} requiredRole="secretary" />}/> */}

           <Route exact path="/viewsecretaryaccount" element={<ProtectedRoute component={ViewSecretaryAccount} requiredRole="secretary"/>} />
           <Route exact path="/edit-account/:id" element={<ProtectedRoute component={EditSecretaryAccount} requiredRole="secretary"/>}/>
           <Route path="/secretary-patients" element={<ProtectedRoute component={SecretaryPatients} requiredRole="secretary"/>}/>
           <Route path="/secretary-visitors" element={<ProtectedRoute component={SecretaryVisitor} requiredRole="secretary"/>}/>


          <Route path="/account" element={<Account/>}/>
          <Route path="*" element={<NotFound />} />
      </Routes>
  )
}
