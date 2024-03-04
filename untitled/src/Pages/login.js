import React, { useState } from 'react';
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import servicebg from "../img/servicebg.jpg";
import separator from "../img/separator.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email: email,
                password: password
            });

            // Stocker le jeton JWT dans le stockage local
            localStorage.setItem('token', response.data.token);

            // Rediriger ou mettre à jour l'état pour montrer que l'utilisateur est connecté
            // Exemple : navigate('/profil');

        } catch (error) {
            console.error('Error during login:', error);
            // Gérer les erreurs d'authentification
        }
    };

    return (
        <main>
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{backgroundImage: `url(${gar5})`}}
                         id="home">
                    {/* Votre code HTML */}
                </section>
                <section className="section service has-bg-image" aria-labelledby="service-label"
                         style={{backgroundImage: `url(${servicebg})`}} id="services">
                    <div className="content">
                        <img className="separator" src={separator} alt="Separateure horizantal"/>
                        <div id="login" className="pane">
                            <h1>Log In</h1>
                            <form onSubmit={handleLogin}>
                                <label>
                                    Email
                                </label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label>
                                    Password
                                </label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <h3 className="forgot"><a href="#">Forgot Password?</a></h3>
                                <button type="submit" className="btn btn-primary">Log In</button>
                                <h3 className="forgot"><a href="/register">Inscription</a></h3>
                            </form>
                        </div>

                        <img className="separator" src={separator} alt="Separateure horizantal"/>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Login;
