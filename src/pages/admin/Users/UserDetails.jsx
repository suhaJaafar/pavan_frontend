// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../../../api/api';
// import Layout from '../../../layout/Layout';

// export default function UserDetails() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     api
//       .get(`/user/${id}`)
//       .then((res) => {
//         setUser(res.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching user details:', error);
//       });
//   }, [id]);

//   if (!user) {
//     return <div>Loading user details...</div>;
//   }

//   return (
//     <Layout>
//       <div className="flex justify-center items-center h-full">
//       <div className="w-fit p-16 bg-gray-50 grid gap-5 rounded-lg shadow-lg">
//         <div className="grid justify-items-center">
//           {user.profile_img ? (
//             <img
//               src={`http://localhost:8000/storage/profile_img/image/${user.profile_img}`}
//               alt="User Profile"
//               className="w-36 h-36 rounded-full"
//             />
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-32 h-32 text-teal-400 stroke-1"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//           )}
// </div>
//           <p className=" mb-2">
//             <span className="font-bold">Name:</span> {user.name}
//           </p>
//           <p className="mb-2">
//             <span className="font-bold">Email:</span> {user.email}
//           </p>
//           {user.role && (
//             <p className="mb-2">
//               <span className="font-bold">Role:</span> {user.role.name}
//             </p>
//           )}
//           {/* Add more details as needed */}
//         </div>
//       </div>
//     </Layout>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Layout from '../../../layout/Layout';
import backgroundImage from '../../../assets/backgroundUseDetails.jpeg';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get(`/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  if (!user) {
    return <Layout> <div className='pl-4'>Loading...</div></Layout>;
  }

  return (
    <Layout>
<div className="items-center flex-col w-full h-full p-[16px] bg-cover  sm:mt-0 mt-20">
<div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-gradient-to-br from-yellow-200 from-5% via-teal-300 via-50% to-teal-400 to-80% "
        >
        <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-gray-300">
        {user.profile_img ? (
            <img
              src={`http://localhost:8000/storage/profile_img/image/${user.profile_img}`}
              alt="User Profile"
              className="w-full h-full rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-32 h-32 text-teal-400 stroke-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
      </div>
{/* Name and position */}
<div className="mt-16 flex flex-col items-center">
        <h4 className="text-navy-700 text-2xl font-bold dark:text-white">
        {user.name}
        </h4>
        {user.role_name && (
                        <h6 className="text-navy-700 text-xl font-bold dark:text-white">
                        {user.role_name}</h6>
        )}
                    <p className="text-navy-700 text-lg font-bold dark:text-white">

                 {user.email}
            </p>
      </div>

</div>

     </Layout>
   );
 }


//     <Card extra={""}>
//       {/* Background and profile */}
//       <div
//         className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
//         style={{ backgroundImage: `url(/img/banner.png)` }}
//       >
//         <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
//           <img
//             className="h-full w-full rounded-full"
//             src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
//             alt=""
//           />
//         </div>
//       </div>

//       {/* Name and position */}
//       <div className="mt-16 flex flex-col items-center">
//         <h4 className="text-navy-700 text-xl font-bold dark:text-white">
//           Adela Parkson
//         </h4>
//         <h5 className="text-base font-normal text-gray-600">Product Manager</h5>
//       </div>

//       {/* Post followers */}
//       <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
//         <div className="flex flex-col items-center justify-center">
//           <h4 className="text-navy-700 text-2xl font-bold dark:text-white">
//             17
//           </h4>
//           <p className="text-sm font-normal text-gray-600">Posts</p>
//         </div>
//         <div className="flex flex-col items-center justify-center">
//           <h4 className="text-navy-700 text-2xl font-bold dark:text-white">
//             9.7K
//           </h4>
//           <p className="text-sm font-normal text-gray-600">Followers</p>
//         </div>
//         <div className="flex flex-col items-center justify-center">
//           <h4 className="text-navy-700 text-2xl font-bold dark:text-white">
//             434
//           </h4>
//           <p className="text-sm font-normal text-gray-600">Following</p>
//         </div>
//       </div>
//     </Card>
//     </Layout>
//   );
// }
