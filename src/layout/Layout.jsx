import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import jwt_decode from "jwt-decode";
import { AiOutlineHome } from 'react-icons/ai';
import { SlWallet } from 'react-icons/sl';
import { BsPeople, BsBoxArrowLeft, BsGear, BsHeartPulse, BsGraphUpArrow } from "react-icons/bs";
import { useNavigate , NavLink} from 'react-router-dom';
import api from "../api/api";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // New state for window width

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/user');
        const user = response.data.user;
        setUserInfo(user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Update window width on resize
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Check initial screen size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          { label: 'Users', path: '/admin-users', icon: BsPeople, gap: false },
          { label: 'Patients', path: '/patients', icon: BsHeartPulse, gap: false },
          { label: 'Expenses', path: '/admin-expenses', icon: SlWallet, gap: false },
          { label: 'My Account', path: '/viewaccount', icon: BsGear, gap: false },
          { label: 'Balance', path: '/balance', icon: BsGraphUpArrow, gap: false },
          { label: 'Logout', path: '/', icon: BsBoxArrowLeft, gap: false, onClick: logout },
        ];
      case 'doctor':
        return [
          { label: 'Dashboard', path: '/doctor-dashboard', icon: AiOutlineHome, gap: false },
          { label: 'Patients', path: '/patient-list', icon: BsHeartPulse, gap: false },
          { label: 'My Account', path: '/account', icon: BsGear, gap: false },
          { label: 'Logout', path: '/', icon: BsBoxArrowLeft, gap: false, onClick: logout },
        ];
      case 'secretary':
        return [
          { label: 'Dashboard', path: '/secretary-dashboard', icon: AiOutlineHome, gap: false },
          { label: 'Patients', path: '/secretary-patients', icon: BsHeartPulse, gap: false },
          { label: 'My Account', path: '/viewaccount', icon: BsGear, gap: false },

          { label: 'Logout', path: '/', icon: BsBoxArrowLeft, gap: false, onClick: logout },
        ];
      default:
        return [];
    }
  };

  const decodedToken = jwt_decode(localStorage.getItem('access_token'));
  const sidebarLinks = getSidebarLinks(decodedToken.role);

  return (
    <div className="text-navy-800 font-sans text-base font-normal leading-relaxed text-inherit antialiased dark:text-white overflow-hidden grid min-h-screen grid-rows-header bg-gray-200">
      {isMobile ? (
        // Render hamburger menu on smaller screens
        <div className="fixed top-0 left-0 z-50 w-full h-16 bg-white shadow-md">
          {/* Hamburger menu button */}
          <button
            className="h-16 px-4 py-2 text-2xl text-gray-700 focus:outline-none"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>
      ) : (
        // Render sidebar on larger screens
<Sidebar links={sidebarLinks} logout={logout} userInfo={userInfo} toggleSidebar={toggleSidebar} />
      )}
<div className={`sidebar-content ml-${isMobile && isSidebarOpen ? '0' : '0'}`}>
  {isSidebarOpen && (
    <div className={`mobile-sidebar-overlay fixed inset-0 z-50 `} onClick={toggleSidebar}>
      <ul className="mobile-sidebar-list absolute top-0 left-0 w-full h-screen bg-black opacity-75">
        {sidebarLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className={`${link.gap ? 'mt-4' : 'mt-2'} flex rounded-md p-2 m-1 cursor-pointer hover:bg-teal-600 text-gray-100 text-sm items-center ${
                window.location.pathname === link.path && 'bg-teal-800'
              }`}
            >
              <div className="flex">
                <link.icon className="m-1" />
                <span className="ml-3">{link.label}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )}
  <div className={`mt-8 ${isMobile ? 'ml-2' : 'ml-60'}`}>
  {children}
</div>

</div>


    </div>
  );
};

export default Layout;
