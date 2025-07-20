// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Sidebar from './components/Sidebar';

// function App() {
//   const [theme, setTheme] = useState('dark');

//   const toggleTheme = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   return (
//     <Router>
//       <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col md:flex-row`}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={
//             <div className="flex flex-1 flex-col md:flex-row w-full max-w-7xl mx-auto">
//               <Sidebar theme={theme} toggleTheme={toggleTheme} />
//               <Home />
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Sidebar from './components/Sidebar';
// import { Toaster } from 'react-hot-toast';

// function App() {
//   const [theme, setTheme] = useState('dark');

//   const toggleTheme = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   return (
//     <Router>
//       <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-900'} flex flex-col md:flex-row`}>
//         <Toaster position="top-right" toastOptions={{
//           style: {
//             background: theme === 'dark' ? '#1F2937' : '#F3F4F6',
//             color: theme === 'dark' ? '#E5E7EB' : '#111827',
//           },
//           success: { duration: 3000 },
//           error: { duration: 4000 }
//         }} />
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={
//             <div className="flex flex-1 flex-col md:flex-row w-full max-w-7xl mx-auto">
//               <Sidebar theme={theme} toggleTheme={toggleTheme} />
//               <Home />
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import { Toaster } from 'react-hot-toast';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-900'} flex flex-col  md:flex-row`}>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: theme === 'dark' ? '#1F2937' : '#F3F4F6',
            color: theme === 'dark' ? '#E5E7EB' : '#111827',
          },
          success: { duration: 3000 },
          error: { duration: 4000 }
        }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={
            <div className="flex flex-1 flex-col md:flex-row w-full max-w-7xl mx-auto">
              <Sidebar theme={theme} toggleTheme={toggleTheme} />
              <Home />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;