



import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function MonthWiseRecords() {
  const [feeRecords, setFeeRecords] = useState([]);
  const [resetDate, setResetDate] = useState(15);
  const [newResetDate, setNewResetDate] = useState('');
  const [editingFee, setEditingFee] = useState(null);
  const [editPaymentMode, setEditPaymentMode] = useState('');
  const [editPaymentDate, setEditPaymentDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'https://fees-management-1.vercel.app';

  useEffect(() => {
    const fetchFeeRecords = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_URL}/api/fees`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeeRecords(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch fee records');
        setFeeRecords([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeeRecords();
  }, []);

  const groupedRecords = feeRecords.reduce((acc, record) => {
    const key = `${record.month} ${record.year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(record);
    return acc;
  }, {});

  const handleReset = async () => {
    if (newResetDate && (newResetDate < 1 || newResetDate > 31)) {
      toast.error('Reset date must be between 1 and 31');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/api/fees/reset`,
        newResetDate ? { newResetDate: parseInt(newResetDate) } : {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (newResetDate) setResetDate(parseInt(newResetDate));
      setNewResetDate('');
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset fees');
    }
  };

  const updateFeeRecord = async (id) => {
    if (!editPaymentMode || !editPaymentDate) {
      toast.error('Please provide payment mode and date');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/api/fees/${id}`,
        { paymentMode: editPaymentMode, paymentDate: editPaymentDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get(`${API_URL}/api/fees`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeeRecords(Array.isArray(res.data) ? res.data : []);
      setEditingFee(null);
      setEditPaymentMode('');
      setEditPaymentDate('');
      toast.success('Fee record updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update fee record');
    }
  };

  if (isLoading) {
    return <div className="p-4 sm:p-6 text-gray-100">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 mt-[40px] ">
      <h2 className="text-2xl mb-4 text-indigo-300">Month-Wise Fee Records</h2>
      <div className="mb-6 flex flex-col sm:flex-row gap-2">
        <input
          type="number"
          value={newResetDate}
          onChange={(e) => setNewResetDate(e.target.value)}
          placeholder={`Current reset: ${resetDate}th`}
          min="1"
          max="31"
          className="border p-2 rounded text-gray-900 flex-1"
        />
        <button
          onClick={handleReset}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transform hover:scale-105 transition-transform duration-200"
        >
          {newResetDate ? 'Update Reset Date' : 'Trigger Manual Reset'}
        </button>
      </div>
      <div className="space-y-4">
        {Object.entries(groupedRecords).map(([monthYear, records]) => (
          <div key={monthYear} className="bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold p-4 text-indigo-300">{monthYear} ({records.length} records)</h3>
            <div className="space-y-2 p-4">
              {records.map(record => (
                <div key={record._id} className="flex items-center p-2 bg-gray-700 rounded">
                  {editingFee === record._id ? (
                    <div className="flex flex-col sm:flex-row gap-2 flex-1">
                      <select
                        value={editPaymentMode}
                        onChange={(e) => setEditPaymentMode(e.target.value)}
                        className="border p-2 rounded text-gray-900 flex-1"
                      >
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                      </select>
                      <input
                        type="date"
                        value={editPaymentDate}
                        onChange={(e) => setEditPaymentDate(e.target.value)}
                        className="border p-2 rounded text-gray-900 flex-1"
                        min="2025-07-15"
                      />
                      <button
                        onClick={() => updateFeeRecord(record._id)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded text-sm transform hover:scale-105 transition-transform duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingFee(null)}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded text-sm transform hover:scale-105 transition-transform duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <img src={record.student.avatar} alt={record.student.name} className="w-10 h-10 mr-3 rounded-full" />
                      <div className="flex-1">
                        <p className="text-gray-100"><strong>{record.student.name}</strong></p>
                        <p className="text-gray-400 text-sm">Mode: {record.paymentMode}</p>
                        <p className="text-gray-400 text-sm">Date: {new Date(record.paymentDate).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingFee(record._id);
                          setEditPaymentMode(record.paymentMode);
                          setEditPaymentDate(new Date(record.paymentDate).toISOString().split('T')[0]);
                        }}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded text-sm transform hover:scale-105 transition-transform duration-200"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthWiseRecords;
