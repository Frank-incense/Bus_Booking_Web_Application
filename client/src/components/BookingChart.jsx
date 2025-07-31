import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BookingChart = () => {
  const [bookingData, setBookingData] = useState({
    labels: [],
    datasets: [{
      label: 'Bookings',
      data: [],
      backgroundColor: '#b0c4f2',
      borderRadius: 0,
      barThickness: 20,
    }],
  });
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');


  useEffect(() => {
  axios.get(`/api/booking-stats?period=${selectedPeriod}`)
    .then(res => {
      const data = res.data;

      const labels = data.map(item => {
        if (selectedPeriod === 'monthly') {
          const [year, month] = item.period.split("-");
          return new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
        } else if (selectedPeriod === 'weekly') {
          return item.period.replace('-', ' Week ');
        } else {
          return item.period;
        }
      });

      const counts = data.map(item => item.count);

      setBookingData(prev => ({
        ...prev,
        labels: labels,
        datasets: [{
          ...prev.datasets[0],
          data: counts,
        }]
      }));
    })
    .catch(err => {
      console.error("Failed to fetch booking stats", err);
    });
    }, [selectedPeriod]);

  const chartOptions = {
    onClick: (_, elements) => {
        if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedMonth(bookingData.labels[index]);
        }
    },
    plugins: { legend: { display: false } },
    layout: { padding: 10 },
    scales: {
        x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#555', font: { size: 11 } },
        },
        y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
        ticks: { stepSize: 5, color: '#555', font: { size: 11 } },
        },
    },
    };

  return (
    <div className="booking-chart">
      <h3>Booking Statistics {selectedMonth && `(Selected: ${selectedMonth})`}</h3>
      <Bar data={bookingData} options={chartOptions} />
      <select
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
        style={{ marginBottom: '1rem' }}
        >
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="yearly">Yearly</option>
    </select>

    </div>
  );
};

export default BookingChart;
