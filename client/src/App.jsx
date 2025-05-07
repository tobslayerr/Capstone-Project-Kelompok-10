
import React, { Suspense, lazy } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
const Home = lazy(() => import('./pages/Customer/Home'));
const CoursesList = lazy(() => import('./pages/Customer/EventList'));
const CourseDetails = lazy(() => import('./pages/Customer/EventDetails'));
const MyEnrollments = lazy(() => import('./pages/Customer/MyEnrollments'));
const Educator = lazy(() => import('./pages/SiCreator/Sicreator'));
const Dashboard = lazy(() => import('./pages/SiCreator/Dashboard'));
const AddCourse = lazy(() => import('./pages/SiCreator/AddEvent'));
const MyCourses = lazy(() => import('./pages/SiCreator/MyEvent'));
const StudentsEnrolled = lazy(() => import('./pages/SiCreator/CustomerEnrolled'));
const UpdateCourse = lazy(() => import('./pages/SiCreator/Updateevent')); // Import UpdateCourse
const SuperAdminPage = lazy(() => import('./pages/superadmin/Superadminpage'));
import EducatorApplicationPage from './pages/SiCreator/SiCreatorApplicationPage';

import Loading from './components/Customer/Loading';
import Navbar from './components/Customer/Navbar';
import 'quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/SiCreator/Profile';

const App = () => {
  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course-list" element={<CoursesList />} />
          <Route path="/course-list/:input" element={<CoursesList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/loading/:path" element={<Loading />} />

          {/* Halaman Apply Jadi Educator */}
          <Route path="/educator/apply" element={<EducatorApplicationPage />} />

          <Route path="/educator" element={<Educator />}>
            <Route path="profile" element={<Profile />} />
            <Route path="/educator" element={<Dashboard />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="manage-tickets" element={<StudentsEnrolled />} />
            <Route path="update-course/:id" element={<UpdateCourse />} />
          </Route>

          {/* Super Admin Route */}
          <Route path="/superadmin" element={<SuperAdminPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;