import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wisataAPI, eventsAPI, kulinerAPI } from '../services/api';

const Home = () => {
  const [featuredWisata, setFeaturedWisata] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [popularKuliner, setPopularKuliner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wisataRes, eventsRes, kulinerRes] = await Promise.all([
          wisataAPI.getAll(),
          eventsAPI.getAll(),
          kulinerAPI.getAll()
        ]);

        setFeaturedWisata(wisataRes.data.slice(0, 3));
        setUpcomingEvents(eventsRes.data.slice(0, 3));
        setPopularKuliner(kulinerRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Memuat data...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Selamat Datang di Banjarmasin</h1>
        <p>Jelajahi keindahan Kota Seribu Sungai dengan pesona budaya, wisata, dan kulinernya yang memukau</p>
        <Link to="/wisata" className="btn">Jelajahi Sekarang</Link>
      </section>

      {/* Featured Wisata */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <h2 className="section-title">Wisata Unggulan</h2>
        <div className="card-grid">
          {featuredWisata.map(wisata => (
            <div key={wisata.id} className="card">
              <img src={wisata.gambar} alt={wisata.nama} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{wisata.nama}</h3>
                <p className="card-description">{wisata.deskripsi}</p>
                <div className="card-meta">
                  <span>📍 {wisata.lokasi}</span>
                  <span>⭐ {wisata.rating}</span>
                </div>
                <div className="card-meta" style={{ marginTop: '0.5rem' }}>
                  <span>🏷️ {wisata.kategori}</span>
                  <span>💰 {wisata.harga_tiket === 0 ? 'Gratis' : `Rp ${wisata.harga_tiket?.toLocaleString('id-ID')}`}</span>
                </div>
                <button className="pesan-btn">
                  🎫 Pesan Tiket
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/wisata" className="btn">Lihat Semua Wisata</Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section">
        <h2 className="section-title">Event Mendatang</h2>
        <div className="card-grid">
          {upcomingEvents.map(event => (
            <div key={event.id} className="card">
              <img src={event.gambar} alt={event.nama} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{event.nama}</h3>
                <p className="card-description">{event.deskripsi}</p>
                <div className="card-meta">
                  <span>📍 {event.lokasi}</span>
                  <span>📅 {new Date(event.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <button className="pesan-btn">
                  📅 Daftar Event
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/events" className="btn">Lihat Semua Event</Link>
        </div>
      </section>

      {/* Popular Kuliner */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <h2 className="section-title">Kuliner Populer</h2>
        <div className="card-grid">
          {popularKuliner.map(kuliner => (
            <div key={kuliner.id} className="card">
              <img src={kuliner.gambar} alt={kuliner.nama} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{kuliner.nama}</h3>
                <p className="card-description">{kuliner.deskripsi}</p>
                <div className="card-meta">
                  <span>📍 {kuliner.lokasi}</span>
                  <span>⭐ {kuliner.rating}</span>
                </div>
                <div className="card-meta" style={{ marginTop: '0.5rem' }}>
                  <span>💰 Rp {kuliner.harga?.toLocaleString('id-ID')}</span>
                </div>
                <button className="pesan-btn">
                  🍽️ Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/kuliner" className="btn">Lihat Semua Kuliner</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;