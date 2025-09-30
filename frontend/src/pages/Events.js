import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';
import PemesananModal from '../components/PemesananModal';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsAPI.getAll();
        setEvents(response.data);
      } catch (err) {
        setError('Gagal memuat data event');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handlePesan = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  if (loading) return <div className="loading">Memuat data event...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="section">
      <h1 className="section-title">📅 Event & Festival Budaya</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: '#64748b' }}>
        Jadwal event dan festival budaya menarik di Banjarmasin
      </p>
      
      <div className="card-grid">
        {events.map(event => (
          <div key={event.id} className="card">
            <img src={event.gambar} alt={event.nama} className="card-img" />
            <div className="card-content">
              <h3 className="card-title">{event.nama}</h3>
              <p className="card-description">{event.deskripsi}</p>
              <div className="card-meta">
                <span>📍 {event.lokasi}</span>
                <span>📅 {new Date(event.tanggal).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <button 
                className="pesan-btn"
                onClick={() => handlePesan(event)}
              >
                📅 Daftar Event
              </button>
            </div>
          </div>
        ))}
      </div>

      <PemesananModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        tipe="event"
      />
    </div>
  );
};

export default Events;