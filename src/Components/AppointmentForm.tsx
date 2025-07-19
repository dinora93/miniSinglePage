import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

// Definir las props que espera el componente
interface AppointmentFormProps {
  onAppointmentAdded: () => void;
}

export const AppointmentForm = ({ onAppointmentAdded }: AppointmentFormProps) => {
  const [patientName, setPatientName] = useState('');
  const [patientTel, setPatientTel] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'appointments'), {
        patientName,
        patientTel,
        appointmentDate,
        appointmentTime,
        reason,
        createdAt: new Date()
      });

      // Limpiar el formulario
      setPatientName('');
      setPatientTel('');
      setAppointmentDate('');
      setAppointmentTime('');
      setReason('');

      // Notificar que se ha agregado una cita
    onAppointmentAdded();

      alert('Cita registrada con éxito!');
    } catch (error) {
      console.error('Error al registrar la cita:', error);
      alert('Ocurrió un error al registrar la cita');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Registrar Nueva Cita</h2>

      <div className="form-group">
        <label>Nombre del Paciente:</label>
        <input 
          type="text" 
          value={patientName} 
          onChange={(e) => setPatientName(e.target.value)} 
          required 
        />
      </div>

       <div className="form-group">
        <label>Número de teléfono:</label>
        <input 
          type="text" 
          value={patientTel} 
          onChange={(e) => setPatientTel(e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Fecha de la cita:</label>
        <input 
          type="date" 
          value={appointmentDate} 
          onChange={(e) => setAppointmentDate(e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Hora de la cita:</label>
        <input 
          type="time" 
          value={appointmentTime} 
          onChange={(e) => setAppointmentTime(e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Motivo de la consulta:</label>
        <textarea 
          value={reason} 
          onChange={(e) => setReason(e.target.value)} 
          required 
        />
      </div>

      <button type="submit">Registrar Cita</button>
    </form>
  );
};
