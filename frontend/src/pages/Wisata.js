import React, { useState, useEffect } from 'react';
import { wisataAPI } from '../services/api';
import PemesananModal from '../components/PemesananModal';

const Wisata = () => {
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const response = await wisataAPI.getAll();
        
        // HAPUS DUPLIKAT - ambil data terbaru berdasarkan nama
        const uniqueWisata = response.data.reduce((acc, current) => {
          const existing = acc.find(item => item.nama === current.nama);
          if (!existing) {
            acc.push(current);
          }
          return acc;
        }, []);

        console.log('Data unik:', uniqueWisata);
        setWisata(uniqueWisata);
      } catch (err) {
        setError('Gagal memuat data wisata');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWisata();
  }, []);

  const handlePesan = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  if (loading) return <div className="loading">Memuat data wisata...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="section">
      <h1 className="section-title">🎫 Destinasi Wisata Banjarmasin</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: '#64748b' }}>
        Temukan berbagai destinasi wisata menarik dengan pesona alam dan budaya khas Banjar
      </p>
      
      <div className="card-grid">
        {wisata.map(item => (
          <div key={item.id} className="card">
            <img
              src={item.gambar}
              alt={item.nama}
              className="card-img"
              onError={(e) => {
                console.log(`❌ Error loading: ${item.gambar}`);
                // Coba alternatif extension
                const altUrl = item.gambar.includes('.jpg') 
                  ? item.gambar.replace('.jpg', '.jpeg')
                  : item.gambar.replace('.jpeg', '.jpg');
                e.target.src = altUrl;
              }}
            />
            <div className="card-content">
              <h3 className="card-title">{item.nama}</h3>
              <p className="card-description">{item.deskripsi}</p>
              <div className="card-meta">
                <span>📍 {item.lokasi}</span>
                <span>⭐ {item.rating}</span>
              </div>
              <div className="card-meta">
                <span>🏷️ {item.kategori}</span>
                <span>💰 {item.harga_tiket === 0 ? 'Gratis' : `Rp ${item.harga_tiket?.toLocaleString()}`}</span>
              </div>
              <button 
                className="pesan-btn"
                onClick={() => handlePesan(item)}
              >
                🎫 Pesan Tiket Wisata
              </button>
            </div>
          </div>
        ))}
      </div>

      <PemesananModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        tipe="wisata"
      />
    </div>
  );
};

export default Wisata;