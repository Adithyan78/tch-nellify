import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SigninForm from './components/SigninForm';
import About from './components/About';
import Programs from './components/Programs';
import Notes from './components/Notes';
import Books from './components/Books';
import Admin from './components/Admin/Admin';
import UserProfile from './components/UserProfile';
import ManageUsers from './components/Admin/ManageUsers';
import ManageBooks from './components/Admin/ManageBook';
import ManageCode from './components/Admin/ManageCode';
import CMenu from './components/CMenu';
import PythonMenu from './components/PythonMenu';
import JavaMenu from './components/JavaMenu';
import CPage from './components/Admin/Cprogram';
import PythonPage from './components/Admin/PythonPrgm';
import NavbarUser from './components/User/NavBarUser';
import ProgramsUser from './components/User/ProgramsUser';
import NotesUser from './components/User/NotesUser';
import BooksUser from './components/User/BooksUser';
import HomePageUser from './components/User/Home-User';
import Navbar3 from './components/Admin/NavBar3';
import Navbar2 from './components/Admin/NavBar2';
import NavbarAdmin from './components/Admin/NavBarAdmin';
import JavaPage from './components/Admin/JavaPrgm';
import TechNews from './components/TechNews';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Container sx={{ marginTop: '80px' }}>
         
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SigninForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/technews" element={<TechNews />} />
          <Route path="/books" element={<Books />} />
          <Route path="/admin" element={<><NavbarAdmin /><Admin /></>} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="/manage-programs" element={<ManageCode />} />
          <Route path="/c" element={<CMenu />} />
          <Route path="/python" element={<PythonMenu />} />
          <Route path="/java" element={<JavaMenu />} />
          <Route path="/cpage" element={<CPage />} />
          <Route path="/pypage" element={<PythonPage />} />
          <Route path="/javapage" element={<JavaPage />} />
          <Route path="/homeuser" element={<HomePageUser />} />
          <Route path="/programsuser" element={<><NavbarUser /><ProgramsUser /></>} />
          <Route path="/notesuser" element={<><NavbarUser /><NotesUser /></>} />
          <Route path="/booksuser" element={<><NavbarUser /><BooksUser /></>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
