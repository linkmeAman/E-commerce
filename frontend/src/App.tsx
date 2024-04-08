import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/layout/Home/Home";
import "./App.css";

function App() {
  useState(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  });

  return (
    <>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
