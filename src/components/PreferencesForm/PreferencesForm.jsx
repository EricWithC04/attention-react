import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// import Swt from "sweetalert2"
import logo from "../../assets/logo-2.png"
import "./PreferencesForm.css"

const PreferencesForm = () => {

    const navigate = useNavigate()

    const [preferences, setPreferences] = useState({
        subject: "",
        time_day: "",
        people: "",
        contact_type: "",
        contact: ""
    })

    const [errorsActive, setErrorsActive] = useState(false)

    const handleChange = (e) => {

        console.log("changed")
        setPreferences((pref) => ({
            ...pref,
            [e.target.name]: e.target.value
        }))

        console.log(preferences);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!errorsActive) setErrorsActive(true)

        console.log(errors)

        if (!Object.keys(errors).length) {
            const token = localStorage.getItem("token")

            fetch("http://localhost:4000/api/users/preferences", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify(preferences),
            })
                .then(res => res.json())
                .then((res) => {
                    Swt.fire({
                        icon: "success",
                        title: "Datos actualizado correctamente!"
                    }),
                        setTimeout(() => {
                            navigate("/")
                        }, 2000);
                })
        }

    }

    const errors = useMemo(() => {
        let formErrors = {}
        if (!errorsActive) return {};
        if (!preferences.subject.length) formErrors.subject = "Debes elegír una materia!"
        if (!preferences.time_day.length) formErrors.time_day = "Debes elegír un momento del día!"
        if (!preferences.people.length) formErrors.people = "Debes elegír que estas buscando!"
        if (!preferences.contact_type.length) formErrors.contact_type = "Debes elegír el tipo de contacto!"
        if (!preferences.contact.length) formErrors.contact = "Debes ingresar tus datos de contacto!"
        if (preferences.contact_type === "Numero Telefónico" && preferences.contact.length < 11) {
            formErrors.contact = "Debes agregar un numero telefonico valido"
        }
        if (preferences.contact_type === "Discord" && !preferences.contact.length) {
            formErrors.contact = "Debes agregar tu usuario de Discord!"
        }
        if (preferences.contact_type === "Slack" && !preferences.contact.length) {
            formErrors.contact = "Debes agregar tu usuario de Slack!"
        }

        return formErrors;
    }, [preferences, errorsActive])

    const materias = [
        "Matemáticas",
        "Lenguaje",
        "Física",
        "Química",
        "Economía",
        "Geografía",
        "Estudios Sociales",
        "Informática"
    ]

    return (
        <form
            action=""
            className="d-flex flex-column border border-3 rounded-3 w-50 mt-5 mb-4 text-color bg-grey"
            id="formulario"
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            <h1 class="fs-1 m-3 purple align-self-center">Preferencias de Usuario</h1>
            <div className='d-flex justify-content-center w-100'>

                <div className="m-3 d-flex flex-column w-50" name="materias">
                    <label className="form-label">¿Qué se le dificulta?</label>
                    <div>
                        <input type="radio" className="form-check-input" name="subject" value="" />
                        <span> Ninguna</span>
                    </div>
                    {
                        materias.map(subject => {
                            return (
                                <div>
                                    <input type="radio" className="form-check-input" name="subject" value={subject} />
                                    <span> {subject}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div>

                    <div>
                        {
                            errors.hasOwnProperty("subject") && errors.subject.length ?
                                (<p className='bg-danger text-white ms-2 me-2 rounded p-1'>{errors.subject}</p>) : null
                        }
                    </div>
                    <div className="m-3">
                        <label className="form-label">
                            ¿En qué momento del día puede estudiar?
                        </label>
                        <select name="time_day" id="" className="form-select">
                            <option value="">Seleccione una opción</option>
                            <option>Día</option>
                            <option>Tarde</option>
                            <option>Noche</option>
                        </select>
                    </div>
                    <div>
                        {
                            errors.hasOwnProperty("time_day") && errors.time_day.length ?
                                (<p className='bg-danger text-white ms-2 me-2 rounded p-1'>{errors.time_day}</p>) : null
                        }
                    </div>
                    <div className="m-3">
                        <label className="form-label"> ¿Qué le gustaría encontrar? </label>
                        <select name="people" className="form-select">
                            <option value="">Seleccione una opción</option>
                            <option>alguien que me acompañe al estudiar</option>
                            <option>despejar dudas</option>
                            <option>tutoría</option>
                        </select>
                    </div>
                    <div>
                        {
                            errors.hasOwnProperty("people") && errors.people.length ?
                                (<p className='bg-danger text-white ms-2 me-2 rounded p-1'>{errors.people}</p>) : null
                        }
                    </div>
                    <div className="m-3 d-flex flex-column" id="contacts">
                        <label className="form-label"> ¿Qué forma de contacto utiliza? </label>
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                name="contact_type"
                                id="cel"
                                value="Numero Telefónico"
                            />
                            <span> Numero Telefónico</span>
                        </div>
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                name="contact_type"
                                id="discord"
                                value="Discord"
                            />
                            <span> Discord</span>
                        </div>
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                name="contact"
                                id="slack"
                                value="Slack"
                            />
                            <span> Slack</span>
                        </div>
                        <div id="contact-input">
                            {
                                preferences.contact === "Numero Telefónico" ? (
                                    <input
                                        type="number"
                                        placeholder='000-0000-0000'
                                        className='w-100 form-control'
                                        name='contact_type'
                                    />
                                ) :
                                    preferences.contact_type === "Discord" || preferences.contact_type === "Slack" ? (
                                        <input
                                            placeholder={`@usuario de ${preferences.contact_type}`}
                                            className='w-100 form-control'
                                            name='contact'
                                        />
                                    ) : null
                            }
                        </div>
                    </div>
                    <div>
                        {
                            errors.hasOwnProperty("contact") && errors.contact.length ?
                                (<p className='bg-danger text-white ms-2 me-2 rounded p-1'>{errors.contact}</p>) : null
                        }
                    </div>
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

export default PreferencesForm