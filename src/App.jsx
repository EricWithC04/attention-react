import React from 'react'
import PreferencesForm from './components/PreferencesForm/PreferencesForm'
import UserProfile from './components/UserProfile/UserProfile'
import UserDataForm from './components/UserDataForm/UserDataForm'
import "./App.css"

function App() {
  return (
    <div
      className="container w-100 d-flex justify-content-center align-items-center"
    >
      <UserDataForm />
    </div>
  )
}

export default App
