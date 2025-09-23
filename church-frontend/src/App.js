import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppNavbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Events from './pages/Events';
import Sermons from './pages/Sermons';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AdminDashboard from './components/AdminDashboard';
import PastorDashboard from './components/PastorDashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import MemberDashboard from './components/MemberDashboard';
import AnnouncementForm from './components/AnnouncementForm';
import AnnouncementList from './components/AnnouncementList';
import Youth from './pages/Youth';
import ManageUsers from './pages/ManageUsers';
import SermonList from './components/SermonList';
import EventList from './components/EventList';
import YouthList from './components/YouthList';



function App() {
  return (
    <>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />


          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/pastor" element={<PastorDashboard />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/member" element={<MemberDashboard />} />

          <Route path="/sermonm" element={<SermonList viewOnly />} />
          <Route path="/eventm" element={<EventList />} />



          <Route path="/announcements" element={<AnnouncementList />} />
          <Route path="/announcements/new" element={<AnnouncementForm />} />


          <Route path="/youth" element={<Youth />} />

          <Route path="/youthm" element={<YouthList />} />
          


          <Route path="/users" element={<ManageUsers />} />

        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}

export default App;