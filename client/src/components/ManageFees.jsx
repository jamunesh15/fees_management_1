



import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function ManageFees() {
  const [students, setStudents] = useState([]);
  const [feeRecords, setFeeRecords] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingFee, setEditingFee] = useState(null);
  const [editPaymentMode, setEditPaymentMode] = useState('');
  const [editPaymentDate, setEditPaymentDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'https://fees-management-1-backend.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to continue');
        setIsLoading(false);
        return;
      }
      try {
        const [studentsRes, feesRes] = await Promise.all([
          axios.get(`${API_URL}/api/students`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/api/fees`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);
        setFeeRecords(Array.isArray(feesRes.data) ? feesRes.data : []);
        if (Array.isArray(studentsRes.data) && studentsRes.data.length > 0) {
          setSelectedStudent(studentsRes.data[0]._id);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch data');
        setStudents([]);
        setFeeRecords([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedStudent) {
      toast.error('Please select a student');
      return;
    }
    if (!paymentDate) {
      toast.error('Please select a payment date');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/fees`,
        { studentId: selectedStudent, paymentMode, paymentDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get(`${API_URL}/api/fees`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeeRecords(Array.isArray(res.data) ? res.data : []);
      setPaymentDate(new Date().toISOString().split('T')[0]);
      toast.success('Fee recorded successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to record fee');
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

  const deleteFeeRecord = async (id) => {
    if (!window.confirm('Are you sure you want to delete this fee record?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/fees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res = await axios.get(`${API_URL}/api/fees`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeeRecords(Array.isArray(res.data) ? res.data : []);
      toast.success('Fee record deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete fee record');
    }
  };

  if (isLoading) {
    return <div className="p-4 sm:p-6 text-gray-100">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 mt-[40px] ">
      <h2 className="text-2xl mb-4 text-indigo-300">Manage Fees</h2>
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="border p-2 rounded text-gray-900 flex-1"
          disabled={students.length === 0}
        >
          {students.length === 0 ? (
            <option value="">No students available</option>
          ) : (
            students.map(student => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))
          )}
        </select>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="border p-2 rounded text-gray-900 flex-1"
        >
          <option value="cash">Cash</option>
          <option value="online">Online</option>
        </select>
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="border p-2 rounded text-gray-900 flex-1"
          min="2025-07-15"
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transform hover:scale-105 transition-transform duration-200"
          disabled={students.length === 0}
        >
          ✔ Record Fee
        </button>
      </div>
      <h3 className="text-lg mb-2 text-indigo-300">Edit Fee Records</h3>
      <div className="space-y-2">
        {feeRecords.map(record => (
          <div key={record._id} className="flex items-center p-2 bg-gray-800 rounded">
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
                  className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded text-sm ml-2 transform hover:scale-105 transition-transform duration-200"
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
                <div className="flex gap-2">
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
                  <button
                    onClick={() => deleteFeeRecord(record._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm transform hover:scale-105 transition-transform duration-200"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageFees;
