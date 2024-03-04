import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Assurez-vous que vous importez correctement useHistory

import "../Styles/profil.css";
import herobanner from "../img/herobanner.png";
import gar5 from "../img/gar5.jpg";
import th from "../img/th.jpeg";

const Profil = () => {
    const [user, setUser] = useState(null);
    const history = useHistory(); // Assurez-vous que useHistory est correctement importé

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Rediriger vers la page de connexion si le jeton JWT est manquant
                    history.push('/login');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://localhost:8080/api/user', config);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Gérer les erreurs de requête
            }
        };

        fetchUserData();
    }, [history]);
    return (
        <main>
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{backgroundImage: `url(${gar5})`}} id="home">
                    <div className="container">
                        <div className="hero-content">
                            {/* Insérez votre contenu ici */}
                        </div>
                        <figure className="hero-banner" style={{width: '1228px', height: '789px'}}>
                            <img src={herobanner} style={{width: '28px', height: '9px'}} alt="red motor vehicle"/>
                        </figure>
                    </div>
                </section>
                <section id="about" className="section about has-before" aria-labelledby="about-label">
                    <div className="container">
                        <div className="about-content">
                            <p className="section-subtitle dark">Profil</p>
                            <img className="image-ronde" src={th} alt="photo de profil utilisateur"/>
                            <ul className="section-subtitle">
                                <li>First Name: {user?.nom || 'N/A'}</li>
                                <li>Last Name: {user?.prenom || 'N/A'}</li>
                                <li>Date of Birth: {user?.dateOfBirth || 'N/A'}</li>
                                <li>Mail : {user?.email || 'N/A'}</li>
                                <li>Plate License: {user?.plateLicense || 'N/A'}</li>
                            </ul>
                        </div>
                        <div className="btn-container">
                            <a href="#" className="btn">
                                <span className="span">Location Outils</span>
                            </a>
                            <br/>
                            <a href="#" className="btn">
                                <span className="span">Location Garage</span>
                            </a>
                            <br/>
                            <a href="#" className="btn">
                                <span className="span">RDV-Entretien</span>
                            </a>
                            <br/>
                            <a href="#" className="btn">
                                <span className="span">Modifier profil</span>
                            </a>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Profil;
