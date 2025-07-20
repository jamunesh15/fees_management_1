



import { useState, useEffect } from 'react';
import axios from 'axios';

function FeeRecords() {
  const [feeRecords, setFeeRecords] = useState([]);

  useEffect(() => {
    const fetchFeeRecords = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL || 'https://fees-management-1.vercel.app/api/fees', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeeRecords(res.data);
      } catch (error) {
        console.error('Failed to fetch fee records:', error);
        setFeeRecords([]);
      }
    };
    fetchFeeRecords();
  }, []);

  return (
    <div className="p-4 sm:p-6 mt-[40px]">
      <h2 className="text-2xl mb-4 text-indigo-400">Fee Records</h2>
      <div className="space-y-4">
        {feeRecords.map(record => (
          <div key={record._id} className="flex items-center p-4 bg-gray-800 rounded-lg shadow">
            <img
              src={record.student?.avatar || '/default-avatar.png'}
              alt={record.student?.name || 'Unknown Student'}
              className="w-12 h-12 mr-4 rounded-full"
              onError={(e) => { e.target.src = '/default-avatar.png'; }}
            />
            <div>
              <p className="text-gray-200"><strong>{record.student?.name || 'Unknown Student'}</strong></p>
              <p className="text-gray-400">Mode: {record.paymentMode}</p>
              <p className="text-gray-400">Date: {new Date(record.paymentDate).toLocaleDateString()}</p>
              <p className="text-gray-400">Month: {record.month} {record.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeeRecords;
