



import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'https://fees-management-1-backend.onrender.com';

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch students');
        setStudents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  } , [ ]);

  const addStudent = async () => {
    if (!name.trim()) {
      toast.error('Student name is required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/api/students`, { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents([...students, res.data]);
      setName('');
      toast.success('Student added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add student');
    }
  };

  const updateStudent = async (id) => {
    if (!editName.trim()) {
      toast.error('Student name is required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/api/students/${id}`, { name: editName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(students.map(student => student._id === id ? res.data : student));
      setEditingStudent(null);
      setEditName('');
      toast.success('Student updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update student');
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student and their fee records?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(students.filter(student => student._id !== id));
      toast.success('Student deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete student');
    }
  };

  if (isLoading) {
    return <div className="p-4  sm:p-6 text-gray-100">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 mt-[40px] ">
      <h2 className="text-2xl mb-4 text-indigo-300">Student List</h2>
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          className="border p-2 rounded text-gray-900 flex-1"
        />
        <button onClick={addStudent} className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transform hover:scale-105 transition-transform duration-200">Add Student

        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(student => (
          <div key={student._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow">
            {editingStudent === student._id ? (
              <div className="flex items-center flex-1">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-2 rounded text-gray-900 flex-1 mr-2"
                />
                <button
                  onClick={() => updateStudent(student._id)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded text-sm transform hover:scale-105 transition-transform duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingStudent(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded text-sm ml-2 transform hover:scale-105 transition-transform duration-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <img src={student.avatar} alt={student.name} className="w-12 h-12 mr-4 rounded-full" />
                  <span className="text-gray-100">{student.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditingStudent(student._id); setEditName(student.name); }}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded text-sm transform hover:scale-105 transition-transform duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student._id)}
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

export default StudentList;
