import { useState } from 'react';
import { AppointmentForm } from './Components/AppointmentForm';
import { AppointmentList } from './Components/AppointmentList';
import './App.css';
import './FormStyles.css';
import './ListStyles.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAppointmentAdded = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="app">
      <h1>Sistema de Citas Médicas, Clinicas de Oriente</h1>
      <div className="app-container">
        <AppointmentForm onAppointmentAdded={handleAppointmentAdded} />
        <AppointmentList key={refresh.toString()} />
      </div>
    </div>
  );
}

export default App;