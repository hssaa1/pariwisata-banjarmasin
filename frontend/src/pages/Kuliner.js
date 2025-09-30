import React, { useState, useEffect } from 'react';
import { kulinerAPI } from '../services/api';
import PemesananModal from '../components/PemesananModal';

const Kuliner = () => {
  const [kuliner, setKuliner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchKuliner = async () => {
      try {
        const response = await kulinerAPI.getAll();
        setKuliner(response.data);
      } catch (err) {
        setError('Gagal memuat data kuliner');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKuliner();
  }, []);

  const handlePesan = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  if (loading) return <div className="loading">Memuat data kuliner...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="section">
      <h1 className="section-title">🍽️ Kuliner Khas Banjarmasin</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: '#64748b' }}>
        Nikmati kelezatan kuliner tradisional khas Banjarmasin yang menggugah selera
      </p>
      
      <div className="card-grid">
        {kuliner.map(item => (
          <div key={item.id} className="card">
            <img src={item.gambar} alt={item.nama} className="card-img" />
            <div className="card-content">
              <h3 className="card-title">{item.nama}</h3>
              <p className="card-description">{item.deskripsi}</p>
              <div className="card-meta">
                <span>📍 {item.lokasi}</span>
                <span>⭐ {item.rating}</span>
              </div>
              <div className="card-meta" style={{ marginTop: '0.5rem' }}>
                <span>💰 Rp {item.harga?.toLocaleString('id-ID')}</span>
              </div>
              <button 
                className="pesan-btn"
                onClick={() => handlePesan(item)}
              >
                🍽️ Pesan Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>

      <PemesananModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        tipe="kuliner"
      />
    </div>
  );
};

export default Kuliner;