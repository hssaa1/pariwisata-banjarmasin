import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Wisata from './pages/Wisata';
import Events from './pages/Events';
import Kuliner from './pages/Kuliner';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wisata" element={<Wisata />} />
            <Route path="/events" element={<Events />} />
            <Route path="/kuliner" element={<Kuliner />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;