import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Link } from 'react-router-dom';
import './App.css'; // Özel stiller
import profileImage from './images/kadir.png';

Chart.register(...registerables);

const Reports = () => {
  const data = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz'],
    datasets: [
      {
        label: 'PVC',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'white',
        borderColor: 'white',
      },
      // Diğer veri setlerini ekleyin
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="App">
      <div className="header">
        <div className="user-profile">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="username">Kadir Çatamak</div>
        </div>
        <div className="controls">
          <Link to="/" className="nav-button">Ana Sayfa</Link>
          <Link to="/reports" className="nav-button">Raporlar</Link>
        </div>
      </div>
    
     
    </div>
  );
}

export default Reports;
