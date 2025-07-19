import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Appointment {
  id: string;
  patientName: string;
  patientTel: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  createdAt: Date;
  formattedDate?: string;
}

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const appointmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Appointment[];
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return (
    <div className="appointment-list">
      <h2>Citas Programadas</h2>
      <div className="loading-state">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );

  return (
    <div className="appointment-list">
      <h2>Citas Programadas</h2>
      {appointments.length === 0 ? (
        <p>No hay citas programadas.</p>
      ) : (
        <div className="appointments-container">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <h3>{appointment.patientName}</h3>
              <p><strong>Teléfono:</strong> {appointment.patientTel}</p>
              <p><strong>Fecha:</strong> {appointment.formattedDate || appointment.appointmentDate} a las {appointment.appointmentTime}</p>
              <p><strong>Motivo:</strong> {appointment.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};