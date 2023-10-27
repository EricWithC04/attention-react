import React, { useState, useEffect } from 'react'
import userImg from "../../assets/user.jpg"
import "./UserProfile.css"

const UserProfile = () => {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch("http://localhost:4000/user/info", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": token
            }
        })
            .then(res => res.json())
            .then(res => setUserData(res))
    }, [])

    return (
        <div className="container">
            {
                userData.hasOwnProperty("name") ? (
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center w-100">
                            <img src={userImg} className="profile rounded-circle mt-4 mb-4 ms-5" alt="foto" />
                            <div className="ms-5 mt-5 text-color">
                                <h2 className="fw-bold purple mb-3" id="name">{userData.name}</h2>
                                <h4 id="description">{userData.description}</h4>
                                <h4 className="lead lead-size" id="email">{userData.email}</h4>
                            </div>
                            <button className="btn btn-size bg-purple text-white align-self-end ms-auto" id="btn-preferences">Preferencias</button>
                        </div>
                        <div className="text-color border p-4 border-3 rounded-2 bg-grey z-position">
                            <legend>Se le dificulta: </legend>
                            <p id="subject">{userData.preferences[0].subject}</p>
                            <hr />
                            <legend>Puede estudiar:</legend>
                            <p id="time_day">{userData.preferences[0].time_day}</p>
                            <hr />
                            <legend>Busca</legend>
                            <p id="people">{userData.preferences[0].people}</p>
                            <hr />
                            <legend>Puede contactarse a traves de:</legend>
                            <p id="contact">{`${userData.preferences[0].contact} : ${userData.preferences[0].contact_type}`}</p>
                        </div>
                    </div>
                ) : <div>Cargando...</div>
            }

        </div>
    )
}

export default UserProfile