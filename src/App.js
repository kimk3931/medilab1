import logo from './logo.svg';
import './App.css';


import styled from "styled-components"
import Side from './components/Side';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AddTests from './components/AddTests';
import LabTests from './components/LabTests';
import AddNurses from './components/AddNurses';
import Nurses from './components/Nurses';
import MyBookings from './components/MyBookings';

const MyH1 = styled.h1`
   color: red;
`
function App() {
  return (
    <Router>
        <div className="App">
        {/* Removed Side and Top bar */}
        {/* Routing will be required here */}
        <Routes>
            <Route path='/' element = {<MainContent/>} ></Route>
            <Route path='/profile' element={<Profile />} ></Route>
            <Route path='/signin' element={<Signin />} ></Route>
            <Route path='/signup' element={<Signup />} ></Route>
            <Route path='/add_tests' element={<AddTests />} ></Route>
            <Route path='/lab_tests' element={<LabTests />} ></Route>
            <Route path='/add_nurses' element={<AddNurses />} ></Route>
            <Route path='/nurses' element={<Nurses />} ></Route>
            <Route path='/mybookings' element={<MyBookings />} ></Route>
        </Routes>  
    
        </div>
      </Router>
  );
}


export default App;