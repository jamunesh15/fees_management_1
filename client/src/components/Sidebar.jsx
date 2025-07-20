



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Sidebar({ theme }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden p-4 bg-indigo-500 rounded-[10px]  hover:bg-indigo-600 mt-[10px]  text-white fixed top-0 left-5 z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-5 h-5 rounded-[3px]  " fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>
      <div className={`w-full md:w-64 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-200'} h-screen p-4 flex flex-col  justify-between fixed md:static top-0 left-0 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div>
          <div className=" mb-6 mt-[50px] ">
            <h2 className="text-xl font-bold text-indigo-300">{user?.name}</h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>


          <nav>
            <ul>
              <li className="mb-4">
                <Link to="/" onClick={handleLinkClick} className="text-gray-100 hover:text-indigo-300 transition-colors duration-200">Student List</Link>
              </li>
              <li className="mb-4">
                <Link to="/manage-fees" onClick={handleLinkClick} className="text-gray-100 hover:text-indigo-300 transition-colors duration-200">Manage Fees</Link>
              </li>
              <li className="mb-4">
                <Link to="/fee-records" onClick={handleLinkClick} className="text-gray-100 hover:text-indigo-300 transition-colors duration-200">Fee Records</Link>
              </li>
              <li className="mb-4">
                <Link to="/month-wise-records" onClick={handleLinkClick} className="text-gray-100 hover:text-indigo-300 transition-colors duration-200">Month-Wise Records</Link>
              </li>
  
    <li>
    
  <div className=' mb-2 mt-[10px] ' >
          {/* <ThemeToggle theme={theme} toggleTheme={() => { toggleTheme(); setIsOpen(false); }} /> */}
          <button onClick={handleLogout} className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transform hover:scale-105 transition-transform duration-200">Logout</button>
        </div>
    </li>
              
            </ul>
          </nav>
        </div>

        

  
        
      </div>
    </>
  );
}

export default Sidebar;







