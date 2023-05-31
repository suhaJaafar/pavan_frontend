import {Route, Routes, useParams} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/protectedRoute";
import NotFound from "./pages/error/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import SecretaryDashboard from "./pages/secertary/SecretaryDashboard";
import Users from "./pages/admin/Users/Users";
import Expenses from "./pages/admin/Expenses";
import Account from "./pages/Account";
import PatientsList from "./pages/doctor/PatientsList";
import AllPatients from "./pages/doctor/AllPatients";
import AdminAccount from "./AdminAccount";
import Balance from "./pages/admin/Balance";
import AddAccount from "./pages/admin/Users/AddAccount";
import GetUserById from "./pages/admin/Users/GetUserById";
import EditUserForm from "./pages/admin/Users/EditUserForm";
import UserDetails from "./pages/admin/Users/UserDetails";
import ViewPatients from "./pages/admin/Patients/ViewPatients";
import AddPatient from "./pages/admin/Patients/AddPatient";
import EditPatientForm from "./pages/admin/Patients/EditPatientForm";
import GetPatientById from "./pages/admin/Patients/GetPatientById";

// import Profile from "./pages/doctor/";


export default function App() {
    const { id } = useParams();

  return (
      <Routes>
          <Route path="/" element={<Login />}/>
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

          <Route path="/patients" element={<ProtectedRoute component={ViewPatients} requiredRole="admin"/>}/>
          <Route path="/add-patient" element={<ProtectedRoute component={AddPatient} requiredRole="admin"/>}/>
          <Route
  path="/patient/:id/edit"
  element={<ProtectedRoute component={() => <EditPatientForm patientId={id} />} requiredRole="admin" />}
/>

          <Route path="/admin-expenses" element={<ProtectedRoute component={Expenses} requiredRole="admin"/>}/>
          <Route path="/doctor-dashboard" element={<ProtectedRoute component={DoctorDashboard} requiredRole="doctor" />}/>
          <Route path="/secretary-dashboard" element={<ProtectedRoute component={SecretaryDashboard} requiredRole="secretary" />}/>
          <Route path="/patient-list" element={<ProtectedRoute component={PatientsList} requiredRole="doctor" />} />
          <Route path="/patients" element={<ProtectedRoute component={AllPatients} requiredRole="doctor" />} />
          {/* <Route path="/user" element={<ProtectedRoute component={Profile} requiredRole="doctor" />} /> */}
          <Route path="/account" element={<ProtectedRoute component={AdminAccount} requiredRole="admin"/>}/>

          <Route path="/account" element={<Account/>}/>
          <Route path="*" element={<NotFound />} />
      </Routes>
  )
}
