import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
