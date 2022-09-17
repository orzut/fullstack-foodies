import React from "react";

import Navbar from "./components/Navbar";
import { Header } from "./components/Pages/Header";
import { LandingPage } from "./components/Pages/LandingPage";
import { Footer } from "./components/Footer";
import Routes from "./Routes";
import Restaurants from "./components/Pages/Restaurants";

const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
       <Routes />
      <LandingPage />
      <Footer />
      <Restaurants />
    </div>
  );
};

export default App;
