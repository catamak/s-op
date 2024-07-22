import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Link } from 'react-router-dom';
import './App.css'; // Özel stiller
import profileImage from './images/socar.png';

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
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
      <div className="table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th> Uyum Takibi</th>
            
            </tr>
          </thead>
          <tbody>
            <th>Fabrika
            </th>
            <th>Ürün</th>
            <th>Revize 1</th>
            <th>Revize 2</th>
            <th>Fark</th>
            <th>Uyum</th>
            <tr>
              <td>PVC</td>
              <td>65</td>
              <td>70</td>
            </tr>
            <tr>
              <td>PVC</td>
              <td>59</td>
              <td>65</td>
            </tr>
            <tr>
              <td>PVC</td>
              <td>80</td>
              <td>85</td>
            </tr>
            <tr>
              <td>PVC</td>
              <td>81</td>
              <td>78</td>
            </tr>
            <tr>
              <td>AYPE</td>
              <td>56</td>
              <td>60</td>
            </tr>
            <tr>
              <td>AYPE</td>
              <td>55</td>
              <td>62</td>
            </tr>
            <tr>
              <td>APPE-T</td>
              <td>40</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
