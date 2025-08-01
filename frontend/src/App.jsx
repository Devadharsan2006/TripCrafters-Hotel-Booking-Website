import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage.jsx'
import PlacesPage from './pages/PlacesPage.jsx'
import PlacesFormPage from './pages/PlacesFormPage.jsx'
import PlacePage from './pages/PlacePage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
axios.defaults.baseURL="https://tripcrafters-hotel-booking-website-3.onrender.com/"
axios.defaults.withCredentials=true;
function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/account/places" element={<PlacesPage/>}/>
        <Route path="/account/places/new" element={<PlacesFormPage/>}/>
        <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
        <Route path="/place/:id" element={<PlacePage/>}/>
        <Route path="/account/bookings" element={<BookingsPage/>}/>
        <Route path="/account/bookings/:id" element={<BookingPage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
