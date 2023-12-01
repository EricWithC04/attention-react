import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PreferencesForm from './components/PreferencesForm/PreferencesForm'
import UserProfile from './components/UserProfile/UserProfile'
import UserDataForm from './components/UserDataForm/UserDataForm'
import "./App.css"
import MemoTest from './components/MemoTest/MemoTest'

function App() {
  return (
    <div
      className="container w-100 d-flex justify-content-center align-items-center"
    >
      <Routes>
        <Route
          path="/"
          element={<MemoTest />}
        />
        {/* <Route
          path="/preferences"
          element={<PreferencesForm />}
        />
        <Route
          path="/userData"
          element={<UserDataForm />}
        /> */}
      </Routes>
    </div>
  )
}

export default App
