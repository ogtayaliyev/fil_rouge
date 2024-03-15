import React, {useState} from 'react';
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


    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/connexion", {
                email: email,
                password: password,
            });
            const { message, token } = response.data;
            if (message === token) {
                localStorage.setItem('token', token); // Stocker le token JWT dans le localStorage
                navigate('/profil'); // Rediriger l'utilisateur vers la page profil
            } else {
                alert("Incorrect Email and Password not match");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during login");
        }
    };



    return (
        <main>
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{backgroundImage: `url(${gar5})`}}
                         id="home">
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-text"></p>
                        </div>
                        <figure className="hero-banner" style={{width: '1228', height: '789'}}>
                            <img src={herobanner} style={{width: '28', height: '9'}} alt="red motor vehicle"/>
                        </figure>
                    </div>
                </section>
                <section className="section service has-bg-image" aria-labelledby="service-label"
                         style={{backgroundImage: `url(${servicebg})`}} id="services">
                    <div className="content">
                        <img className="separator" src={separator} alt="Separateure horizantal"/>
                        <div id="login" className="pane">
                            <h1>Log In</h1>
                            <form onSubmit={login}>
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
