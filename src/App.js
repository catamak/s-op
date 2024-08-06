import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ReportsPage from './Pages/ReportsPage';
import UyumTablosu from './Pages/UyumTakibiPage'; // Uyum Tablosu sayfası
import UyumCizelgesi from './Pages/UyumCizelgesiPage'; // Uyum Çizelgesi sayfası
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/list" element={<UyumTablosu />} /> {/* Uyum Takibi sayfası */}
          <Route path="/chart" element={<UyumCizelgesi />} /> {/* Uyum Çizelgesi sayfası */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
