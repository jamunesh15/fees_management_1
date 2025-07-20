// import { Routes, Route } from 'react-router-dom';
// import StudentList from '../components/StudentList';
// import ManageFees from '../components/ManageFees';
// import FeeRecords from '../components/FeeRecords';

// function Home() {
//   return (
//     <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
//       <Routes>
//         <Route path="/" element={<StudentList />} />
//         <Route path="/manage-fees" element={<ManageFees />} />
//         <Route path="/fee-records" element={<FeeRecords />} />
//       </Routes>
//     </div>
//   );
// }

// export default Home;



// import { Routes, Route } from 'react-router-dom';
// import StudentList from '../components/StudentList';
// import ManageFees from '../components/ManageFees';
// import FeeRecords from '../components/FeeRecords';
// import MonthWiseRecords from '../components/MonthWiseRecords';

// function Home() {
//   return (
//     <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
//       <Routes>
//         <Route path="/" element={<StudentList />} />
//         <Route path="/manage-fees" element={<ManageFees />} />
//         <Route path="/fee-records" element={<FeeRecords />} />
//         <Route path="/month-wise-records" element={<MonthWiseRecords />} />
//       </Routes>
//     </div>
//   );
// }

// export default Home;


// import { Routes, Route } from 'react-router-dom';
// import StudentList from '../components/StudentList';
// import ManageFees from '../components/ManageFees';
// import FeeRecords from '../components/FeeRecords';
// import MonthWiseRecords from '../components/MonthWiseRecords';

// function Home() {
//   return (
//     <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
//       <Routes>
//         <Route path="/" element={<StudentList />} />
//         <Route path="/manage-fees" element={<ManageFees />} />
//         <Route path="/fee-records" element={<FeeRecords />} />
//         <Route path="/month-wise-records" element={<MonthWiseRecords />} />
//       </Routes>
//     </div>
//   );
// }

// export default Home;



import { Routes, Route } from 'react-router-dom';
import StudentList from '../components/StudentList';
import ManageFee from '../components/ManageFees';
import FeeRecords from '../components/FeeRecords';
import MonthWiseRecords from '../components/MonthWiseRecords';

function Home() {
  return (
    <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full  ">
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/manage-fees" element={<ManageFee />} />
        <Route path="/fee-records" element={<FeeRecords />} />
        <Route path="/month-wise-records" element={<MonthWiseRecords />} />
      </Routes>
    </div>
  );
}

export default Home;