import React, { useEffect, useState, useMemo } from 'react'
import logo from "../../assets/logo-2.png"

const UserDataForm = () => {

    const [userData, setUserData] = useState({})

    const [errorsActive, setErrorsActive] = useState(false)

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
            .catch(err => console.error(err))
    }, [])

    const handleChange = (e) => {
        const newData = {
            ...userData,
            [e.target.name]: e.target.value
        }
        console.log(newData)
        setUserData(newData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!errorsActive) setErrorsActive(true)

        console.log(errors)

        if (!Object.keys(errors).length) {
            const token = localStorage.getItem("token")

            fetch("http://localhost:4000/user/info", {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify(userData),
            })
                .then(res => res.json())
                .then((res) => console.log(res))
        }

    }

    const errors = useMemo(() => {
        let formErrors = {}
        // if (!errorsActive) return {};
        // if (!preferences.subject.length) formErrors.subject = "Debes elegír una materia!"
        // if (!preferences.time_day.length) formErrors.time_day = "Debes elegír un momento del día!"
        // if (!preferences.people.length) formErrors.people = "Debes elegír que estas buscando!"
        // if (!preferences.contact_type.length) formErrors.contact_type = "Debes elegír el tipo de contacto!"
        // if (!preferences.contact.length) formErrors.contact = "Debes ingresar tus datos de contacto!"
        // if (preferences.contact_type === "Numero Telefónico" && preferences.contact.length < 11) {
        //     formErrors.contact = "Debes agregar un numero telefonico valido"
        // }
        // if (preferences.contact_type === "Discord" && !preferences.contact.length) {
        //     formErrors.contact = "Debes agregar tu usuario de Discord!"
        // }
        // if (preferences.contact_type === "Slack" && !preferences.contact.length) {
        //     formErrors.contact = "Debes agregar tu usuario de Slack!"
        // }

        return formErrors;
    }, [errorsActive])

    return (
        <form
            action=""
            className="d-flex flex-column border border-3 rounded-3 w-50 mt-5 mb-4 text-color bg-grey"
            id="formulario"
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            <h1 class="fs-1 m-3 purple align-self-center">Datos de Usuario</h1>
            <div className='d-flex justify-content-center align-self-center flex-column w-75'>
                <div className="m-3">
                    <label className="form-label">
                        Nombre de Usuario
                    </label>
                    <input name="name" className="form-control" value={userData.hasOwnProperty("name") ? userData.name : ""} />
                </div>
                <div className="m-3">
                    <label className="form-label">Ocupación</label>
                    <input name="ocupation" className="form-control" value={userData.hasOwnProperty("ocupation") ? userData.ocupation : ""} />
                </div>
                <div className="m-3">
                    <label className="form-label">Breve descripción de su problema</label>
                    <input type="text" name="problem" className='form-control' value={userData.hasOwnProperty("problem") ? userData.problem : ""} />
                </div>
            </div>
            <input
                type="submit"
                className="btn bg-purple text-white m-3"
                value="Submit"
            />
            <div class="logo-with-text w-100 border-3 border-top mt-4 d-flex justify-content-center gap-3 align-items-center">
                <img src={logo} class="my-auto" alt="Logo Attention" />
            </div>
        </form>
    )
}

export default UserDataForm