import React from "react";

import Navbar from "./components/Navbar";
import { LandingPage } from "./components/Pages/LandingPage";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <LandingPage /> */}
    </div>
  );
};

export default App;
