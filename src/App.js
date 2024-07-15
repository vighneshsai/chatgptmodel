import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './UI/pages/home_page';
import LoginFirstPage from './UI/pages/login_first_page';

import SignInPage from './UI/pages/signin_page';
import LoginPage from './UI/pages/login_page';
import StudentPage from './UI/pages/employee_page';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginFirstPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/employee' element={<StudentPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/login' element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
