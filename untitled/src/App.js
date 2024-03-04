import React, {useState} from 'react';
import './Styles/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderNavbar from './components/navbar/HeaderNavbar';
import Main from './Pages/main';
import Footer from './components/Footer/Footer';
import Register from './Pages/register';
import Login from "./Pages/login";
import Profil from "./Pages/profil";



function App() {

    return (
        <div className="App">
            <Router>
                <HeaderNavbar />
                <Routes>
                    <Route path="/home" element={<Main />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profil" element={<Profil />} />

                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
