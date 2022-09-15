import React from 'react'

import Navbar from './components/Navbar'
import { Header } from './components/Pages/Header'
import { LandingPage } from './components/Pages/LandingPage'
import { Footer } from './components/Footer'
import Routes from './Routes'


const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      {/* <Routes /> */}
      <LandingPage />
      <Footer />
    </div>
  )
}

export default App
