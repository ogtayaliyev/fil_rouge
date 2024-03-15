import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importation d'axios

import "../Styles/profil.css";
import herobanner from "../img/herobanner.png";
import gar5 from "../img/gar5.jpg";
import th from "../img/th.jpeg";

const Profil = ({token}) => {
    const [user, setUser] = useState({});
    const [isUserUpdated, setisUserUpdated] = useState(false);

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/api/connexion", {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                });
                setUser(data);
                setisUserUpdated(false);
            } catch (error) {
                console.log({ error });
            }
        };
        getProfileData();
    }, [token, isUserUpdated]);

    return (
        <main>
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{backgroundImage: `url(${gar5})`}} id="home">
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-text"></p>
                        </div>
                        <figure className="hero-banner" style={{width: '1228', height: '789'}}>
                            <img src={herobanner} style={{width: '28', height: '9'}} alt="red motor vehicle"/>
                        </figure>
                    </div>
                </section>
                <section id="about" className="section about has-before" aria-labelledby="about-label">
                    <div className="container">
                        <div className="about-content">
                            <p className="section-subtitle :dark">Profil</p>
                            <img className="image-ronde" src={th} alt="photo de profil utilisateure"/>
                            <ul className="section-subtitle">
                                <li>First Name: {user.nom }</li>
                                <li>Last Name: </li>
                                <li>Date of Birth:</li>
                                <li>Mail : {user.email} </li>
                                <li>Plate License:</li>
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
