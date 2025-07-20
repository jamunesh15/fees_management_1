import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentList from '../components/StudentList';
import ManageFees from '../components/ManageFees';
import FeeRecords from '../components/FeeRecords';
import MonthWiseRecords from '../components/MonthWiseRecords';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 sm:p-6 text-red-500">
          <h2 className="text-xl mb-2">Something went wrong</h2>
          <p>{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transform hover:scale-105 transition-transform duration-200"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Home() {
  return (
    <div className="flex-1 p-4 sm:p-6">
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/manage-fees" element={
          <ErrorBoundary>
            <ManageFees />
          </ErrorBoundary>
        } />
        <Route path="/fee-records" element={
          <ErrorBoundary>
            <FeeRecords />
          </ErrorBoundary>
        } />
        <Route path="/month-wise-records" element={
          <ErrorBoundary>
            <MonthWiseRecords />
          </ErrorBoundary>
        } />
      </Routes>
    </div>
  );
}

export default Home;
