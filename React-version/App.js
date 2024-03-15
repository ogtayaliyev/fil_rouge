import React, {useState} from 'react';
import './Styles/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderNavbar from './components/navbar/HeaderNavbar';
import Main from './Pages/main';
import Footer from './components/Footer/Footer';
import Register from './Pages/register';
import Login from "./Pages/login";
import Profil from "./Pages/profil";
import { Protector, userData } from "./helpers";


function App() {
    const { jwt } = userData();
    return (
        <div className="App">
            <Router>
                <HeaderNavbar />
                <Routes>
                    <Route path="/home" element={<Main />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/profil"
                        element={<Protector Component={Profil} token={jwt} />}
                    />

                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
