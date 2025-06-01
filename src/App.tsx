import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProtectedRoute from './view/pages/RouteProtected'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./view/pages/RegisterPage";
import './App.css'
import MainPage from './view/pages/MainPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<MainPage/>} >
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>)
}

export default App
