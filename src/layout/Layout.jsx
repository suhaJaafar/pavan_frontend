import React from 'react';
import Sidebar from './Sidebar';
import jwt_decode from "jwt-decode";
import {AiOutlineHome} from 'react-icons/ai'
import {FaUsers} from 'react-icons/fa'
import {SlWallet} from 'react-icons/sl'
import {AiFillSetting} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import api from "../api/api";


const Layout = ({ children }) => {
  const navigate = useNavigate();

  const logout = async () => {
    const accessToken = localStorage.getItem('access_token');
    console.log('Access Token:', accessToken);

    if (accessToken) {
      try {
        // Make a request to your logout endpoint using Axios
        await api.post('/logout', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('Logout successful.');

        localStorage.removeItem('access_token');
        console.log('Access Token removed from local storage');

        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      console.error('Access token not found.');
    }
  };


  const getSidebarLinks = (userRole) => {
    switch (userRole) {
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin-dashboard', icon: AiOutlineHome, gap: false },
          { label: 'Users', path: '/admin-users', icon: FaUsers, gap: false },
          { label: 'Patients', path: '/patients', icon: FaUsers, gap: false },
          { label: 'Expenses', path: '/admin-expenses', icon: SlWallet, gap: false },
          { label: 'My Account', path: '/viewaccount', icon: AiFillSetting, gap: false },
          { label: 'Balance', path: '/balance', icon: AiFillSetting, gap: false },
          { label: 'Logout', path: '/', icon: AiFillSetting, gap: false, onClick: logout },
        ];
      case 'doctor':
        return [
          { label: 'Dashboard', path: '/doctor-dashboard', icon: AiOutlineHome, gap: false },
          { label: 'Patients', path: '/patient-list', icon: AiOutlineHome, gap: false },
          { label: 'AllPatients', path: '/patients', icon: AiOutlineHome, gap: false },
          { label: 'Account', path: '/account', icon: AiFillSetting, gap: false },
          { label: 'Profile', path: '/viewaccount', icon: AiFillSetting, gap: false },
          { label: 'Logout', path: '/', icon: AiFillSetting, gap: false, onClick: logout },
        ];
      case 'secretary':
        return [
          { label: 'Dashboard', path: '/secretary-dashboard', icon: AiOutlineHome, gap: false },
          { label: 'Logout', path: '/', icon: AiFillSetting, gap: false, onClick: logout },
        ];
      default:
        return [];
    }
  };

  const decodedToken = jwt_decode(localStorage.getItem("access_token"));
  const sidebarLinks = getSidebarLinks(decodedToken.role);

  return (
    <div className="text-navy-800 font-sans text-base font-normal leading-relaxed text-inherit antialiased dark:text-white overflow-hidden grid min-h-screen grid-rows-header bg-gray-200">
      <div className="grid md:grid-cols-sidebar">
      <Sidebar links={sidebarLinks} logout={logout} children={children} />
      </div>
    </div>
  );
};

export default Layout;

