// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import logo from '../assets/logo192.png';
// import { FaTooth } from 'react-icons/fa';
// import { FaUsers } from 'react-icons/fa';
// import { CgArrowRightO } from 'react-icons/cg';
// import { GiHamburgerMenu } from 'react-icons/gi';




// const Sidebar = ({ links, children, logout, userInfo }) => {
//     const [open, setOpen] = useState(true);
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const handleSubMenuToggle = (index) => {
//       const updatedLinks = [...links];
//       updatedLinks[index].open = !updatedLinks[index].open;
//       setOpen(!open);
//       setMobileOpen(!mobileOpen);
//     };

//     return (
//       <aside
//         className={`fixed top-0 left-0 h-screen w-60 bg-gradient-to-br from-teal-200 to-teal-700 p-4 pt-8 md:opacity-100 md:transform-none sidebar-transition ${
//           mobileOpen ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-full'
//         }`}
//       >
//         <div className="h-20">
//           {userInfo && (
//             <div className="grid justify-items-center items-center ">
//               {/* User profile image */}
//               {/* ... */}
//             </div>
//           )}
//         </div>

//         <div className="mt-8">
//           <ul className="pt-4">
//             {links.map((link, index) => (
//               <li key={index}>
//                 {link.submenu ? (
//                   <>
//                     {/* Main menu item */}
//                     {/* ... */}

//                     {/* Submenu items */}
//                     {link.open && (
//                       <ul className="pl-6">
//                         {link.submenu.map((sublink, subIndex) => (
//                           <li key={subIndex}>
//                             <NavLink
//                               to={sublink.path}
//                               className={`${
//                                 sublink.gap ? 'mt-4' : 'mt-2'
//                               }  flex rounded-md p-2 m-1 cursor-pointer hover:bg-teal-600 text-gray-100 text-sm items-center ${
//                                 window.location.pathname === sublink.path && 'bg-teal-800'
//                               }`}
//                             >
//                               <div className="flex">
//                                 <sublink.icon className="m-1" />
//                                 <span className="ml-3">{sublink.label}</span>
//                               </div>
//                             </NavLink>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </>
//                 ) : (
//                   <NavLink
//                     onClick={() => {
//                       if (link.label === 'Logout') logout();
//                     }}
//                     to={link.path}
//                     className={`${
//                       link.gap ? 'mt-4' : 'mt-2'
//                     } flex rounded-md p-2 m-1 cursor-pointer hover:bg-sky-600 text-gray-100 text-sm items-center ${
//                       window.location.pathname === link.path && 'bg-teal-800'
//                     }`}
//                   >
//                     <div className="flex">
//                       <link.icon className="m-1 text-xl" />
//                       <span className={`${!open && 'hidden'} text-lg origin-left duration-200 ml-3`}>
//                         {link.label}
//                       </span>
//                     </div>
//                   </NavLink>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </aside>
//     );
//   };
//   export default Sidebar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo192.png';
import { FaTooth } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { CgArrowRightO } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';


const Sidebar = ({ links, children, logout, userInfo, toggleSidebar }) => {
    const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubMenuToggle = (index) => {
    const updatedLinks = [...links];
    updatedLinks[index].open = !updatedLinks[index].open;
    setOpen(!open);
    setMobileOpen(!mobileOpen);

  };

  return (
<aside className={`fixed top-0 left-0 h-screen w-60 bg-gradient-to-br from-yellow-200 from-10% via-teal-300 via-50% to-teal-400 to-80%  p-4 pt-8 md:opacity-100 md:transform-none sidebar-transition ${
  mobileOpen ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-full'
}`}>
<div className=' h-20'>
      {userInfo && (
        <div className="grid justify-items-center items-center ">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            {userInfo.profile_img ? (
              <img
                src={`http://localhost:8000/storage/profile_img/image/${userInfo.profile_img}`}
                alt="User Profile"
                className="w-24 h-24 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop in case of image loading error
                  e.target.style.display = 'none'; // Hide the image element
                }}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 text-white stroke-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </div>
          <span className="text-gray-100 text-sm mt-2">{userInfo.name}</span>
        </div>
      )}
</div>
      <div className="mt-8"> {/* Add a margin-top to create space below the image and name */}


        <ul className=" pt-4">
          {links.map((link, index) => (
            <li key={index}>
              {link.submenu ? (
                <>
                  <div
                    className={`${
                      link.gap ? 'mt-4' : 'mt-2'
                    } flex rounded-md p-2 m-1 cursor-pointer hover:bg-sky-600 text-gray-100 text-sm items-center`}
                    onClick={() => handleSubMenuToggle(index)} // Toggle individual sub-menu
                  >
                    <div className="flex">
                      <FaUsers className="m-1" />
                      <span className={`${!open && 'hidden'} text-2xl origin-left duration-200 ml-3`}>
                        {link.label}
                      </span>
                    </div>
                  </div>
                  {link.open && ( // Check if the sub-menu should be open
                    <ul className="pl-6">
                      {link.submenu.map((sublink, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={sublink.path}
                            className={`${
                              sublink.gap ? 'mt-4' : 'mt-2'
                            }  flex rounded-md p-2 m-1 cursor-pointer hover:bg-teal-400 text-gray-100 text-sm items-center ${
                              window.location.pathname === sublink.path && 'bg-teal-400'
                            }`}
                          >
                            <div className="flex">
                              <sublink.icon className="m-1" />
                              <span className="ml-3">{sublink.label}</span>
                            </div>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  onClick={() => {
                    if (link.label === 'Logout') logout();
                  }}
                  to={link.path}
                  className={`${
                    link.gap ? 'mt-4' : 'mt-2'
                  } flex rounded-md p-2 m-1 cursor-pointer hover:bg-sky-600 text-gray-100 text-sm items-center ${
                    window.location.pathname === link.path && 'bg-teal-400'
                  }`}
                >
                  <div className="flex">
                    <link.icon className="m-1 text-xl" />
                    <span className={`${!open && 'hidden'} text-lg origin-left duration-200 ml-3`}>
                      {link.label}
                    </span>
                  </div>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;





// <!-- import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import logo from '../assets/logo192.png';
// import { FaTooth } from 'react-icons/fa';
// import { FaUsers } from 'react-icons/fa';
// import { CgArrowRightO } from 'react-icons/cg';
// import { GiHamburgerMenu } from 'react-icons/gi';

// const Sidebar = ({ links, children , id, logout, userInfo }) => {
//   const [open, setOpen] = useState(true);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleSubMenuToggle = (index) => {
//     const updatedLinks = [...links];
//     updatedLinks[index].open = !updatedLinks[index].open;
//     setOpen(!open);
//   };

//   return (
//     <aside className=" flex min-h-screen w-72 ">
//       <div
//         className={`${
//           open ? 'w-72' : 'w-20'
//         } fixed md:relative bg-gradient-to-br from-teal-200	 to-teal-700 p-4 pt-8 md:opacity-100 md:transform-none sidebar-transition ${
//           mobileOpen ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-full'
//         }`}
//       >
//        {userInfo && (
//   <div className="grid justify-items-center items-center ">
//     {userInfo.profile_img ? (
//       <div
//         className="w-24 h-24 rounded-full overflow-hidden"
//       >
//         <img
//           src={`http://localhost:8000/storage/profile_img/image/${userInfo.profile_img}`}
//           alt="User Profile"
//           className="w-24 h-24 object-cover"
//         />
//       </div>
//     ) : (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         className="w-24 text-white stroke-1"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
//         />
//       </svg>
//     )}
//     <span className="text-gray-100 text-sm">{userInfo.name}</span>
//   </div>
// )}



//         <button
//           className={`md:block hidden absolute cursor-pointer -right-2 top-9 bg-white border-teal-600
//                     border-2 rounded-full duration-300 ${!open && 'rotate-180'}`}
//           onClick={() => setOpen(!open)}
//           title="expand and collabse sidebar"
//           type="button"
//         >
//           <CgArrowRightO />
//         </button>
//         {/* <div className="gap-x-4 items-center p-2 hidden md:block">
//           <FaTooth
//             className={`cursor-pointer duration-500 h-7 ${open && 'rotate-[360deg] h-7'}`}
//             onClick={() => setOpen(!open)}
//             style={{ color: '#ffffff' }}
//           />
//         </div> */}
//         <ul className=" fixed pt-4">
//           {links.map((link, index) => (
//             <li key={index}>
//               {link.submenu ? (
//                 <>
//                   <div
//                     className={`${
//                       link.gap ? 'mt-4' : 'mt-2'
//                     } flex rounded-md p-2 m-1 cursor-pointer hover:bg-sky-600 text-gray-100 text-sm items-center`}
//                     onClick={() => handleSubMenuToggle(index)} // Toggle individual sub-menu
//                   >
//                     <div className="flex">
//                       <FaUsers className="m-1" />
//                       <span className={`${!open && 'hidden'} text-2xl origin-left duration-200 ml-3`}>
//                         {link.label}
//                       </span>
//                     </div>
//                   </div>
//                   {link.open && ( // Check if the sub-menu should be open
//                     <ul className="pl-6">
//                       {link.submenu.map((sublink, subIndex) => (
//                         <li key={subIndex}>
//                           <NavLink
//                             to={sublink.path}
//                             className={`${
//                               sublink.gap ? 'mt-4' : 'mt-2'
//                             }  flex rounded-md p-2 m-1 cursor-pointer hover:bg-teal-600 text-gray-100 text-sm items-center ${
//                               window.location.pathname === sublink.path && 'bg-teal-800'
//                             }`}
//                           >
//                             <div className="flex">
//                               <sublink.icon className="m-1" />
//                               <span className="ml-3">{sublink.label}</span>
//                             </div>
//                           </NavLink>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </>
//               ) : (
//                 <NavLink
//                 onClick={()=>{if(link.label==='Logout')logout()}}
//                   to={link.path}
//                   className={`${
//                     link.gap ? 'mt-4' : 'mt-2'
//                   } flex rounded-md p-2 m-1 cursor-pointer hover:bg-sky-600 text-gray-100 text-sm items-center ${
//                     window.location.pathname === link.path && 'bg-teal-800'
//                   }`}
//                 >
//                   <div className="flex">
//                     <link.icon className="m-1 text-xl" />
//                     <span className={`${!open && 'hidden'} text-lg origin-left duration-200 ml-3`}>
//                       {link.label}
//                     </span>
//                   </div>
//                 </NavLink>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <button
//         className="top-0 -left-0 p-2 md:hidden absolute"
//         onClick={() => setMobileOpen(!mobileOpen)}
//         title="menu button"
//         type="button"
//       >
//         <GiHamburgerMenu />
//       </button>
//       <div className="w-full p-5 md:p-7 bg-slate-100">{children}</div>
//     </aside>
//   );
// };

// export default Sidebar; -->
