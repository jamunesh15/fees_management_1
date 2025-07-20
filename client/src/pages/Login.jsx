// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // function Login() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [name, setName] = useState('');
// //   const [isRegister, setIsRegister] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async () => {
// //     try {
// //       const url = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
// //       const data = isRegister ? { email, password, name } : {ieszcz

// // System: { email, password };
// //       const res = await axios.post(url, data);
// //       localStorage.setItem('token', res.data.token);
// //       localStorage.setItem('user', JSON.stringify(res.data.user));
// //       navigate('/');
// //     } catch (error) {
// //       alert('Error: ' + error.response.data.message);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center h-screen bg-gray-900">
// //       <div className="p-6 bg-gray-800 rounded">
// //         <h2 className="text-2xl mb-4 text-white">{isRegister ? 'Register' : 'Login'}</h2>
// //         {isRegister && (
// //           <input
// //             type="text"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             placeholder="Name"
// //             className="border p-2 mb-2 w-full text-black"
// //           />
// //         )}
// //         <input
// //           type="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           placeholder="Email"
// //           className="border p-2 mb-2 w-full text-black"
// //         />
// //         <input
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           placeholder="Password"
// //           className="border p-2 mb-2 w-full text-black"
// //         />
// //         <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
// //           {isRegister ? 'Register' : 'Login'}
// //         </button>
// //         <button
// //           onClick={() => setIsRegister(!isRegister)}
// //           className="mt-2 text-blue-400 underline"
// //         >
// //           {isRegister ? 'Switch to Login' : 'Switch to Register'}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;




// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [isRegister, setIsRegister] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     try {
//       const url = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
//       const data = isRegister ? { email, password, name } : { email, password };
//       const res = await axios.post(url, data);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       navigate('/');
//     } catch (error) {
//       alert('Error: ' + error.response.data.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-900">
//       <div className="p-6 bg-gray-800 rounded">
//         <h2 className="text-2xl mb-4 text-white">{isRegister ? 'Register' : 'Login'}</h2>
//         {isRegister && (
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name"
//             className="border p-2 mb-2 w-full text-black"
//           />
//         )}
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="border p-2 mb-2 w-full text-black"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="border p-2 mb-2 w-full text-black"
//         />
//         <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
//           {isRegister ? 'Register' : 'Login'}
//         </button>
//         <button
//           onClick={() => setIsRegister(!isRegister)}
//           className="mt-2 text-blue-400 underline"
//         >
//           {isRegister ? 'Switch to Login' : 'Switch to Register'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
      const data = isRegister ? { email, password, name } : { email, password };
      const res = await axios.post(url, data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-900 p-4">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-indigo-400">{isRegister ? 'Register' : 'Login'}</h2>
        {isRegister && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2 mb-2 w-full rounded text-gray-900"
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mb-2 w-full rounded text-gray-900"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 mb-2 w-full rounded text-gray-900"
        />
        <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full">
          {isRegister ? 'Register' : 'Login'}
        </button>
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-2 text-indigo-400 hover:text-indigo-300 underline w-full text-center"
        >
          {isRegister ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </div>
    </div>
  );
}

export default Login;