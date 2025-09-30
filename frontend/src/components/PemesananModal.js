import React, { useState, useEffect } from 'react';
import { pemesananAPI } from '../services/api';

const PemesananModal = ({ isOpen, onClose, item, tipe }) => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_telepon: '',
    jumlah: 1,
    tanggal: '',
    catatan: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const getDefaultDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nama: '',
        email: '',
        no_telepon: '',
        jumlah: 1,
        tanggal: getDefaultDate(),
        catatan: ''
      });
      setMessage({ type: '', text: '' });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const tanggalISO = new Date(formData.tanggal + 'T00:00:00Z').toISOString();
      
      const pemesananData = {
        nama: formData.nama,
        email: formData.email,
        no_telepon: formData.no_telepon,
        tipe: tipe,
        item_id: item.id,
        jumlah: parseInt(formData.jumlah),
        tanggal: tanggalISO,
        catatan: formData.catatan || ''
      };

      const response = await pemesananAPI.create(pemesananData);
      
      setMessage({
        type: 'success',
        text: `🎉 Pemesanan berhasil! ID: ${response.data.data.id}`
      });
      
      // Auto close setelah 2 detik
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setMessage({
        type: 'error',
        text: `😞 ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message ketika user mulai mengetik lagi
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            {tipe === 'wisata' ? '🎫 Pesan Tiket Wisata' : 
             tipe === 'kuliner' ? '🍽️ Pesan Menu Kuliner' : 
             '📅 Daftar Event'}
          </h2>
          <button className="close-btn" onClick={onClose} disabled={loading}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          {/* Item Information */}
          <div className="item-info">
            <h3>{item?.nama || 'Item'}</h3>
            <p>{item?.deskripsi || 'Deskripsi item'}</p>
            {tipe === 'wisata' && (
              <p className="price">
                💰 {item?.harga_tiket === 0 ? 'Gratis' : `Rp ${item?.harga_tiket?.toLocaleString('id-ID')}`}
              </p>
            )}
            {tipe === 'kuliner' && (
              <p className="price">
                💰 Rp {item?.harga?.toLocaleString('id-ID')} / porsi
              </p>
            )}
            {tipe === 'event' && (
              <p className="price">
                🎊 Event Spesial
              </p>
            )}
          </div>

          {/* Success/Error Messages */}
          {message.text && (
            <div className={message.type === 'success' ? 'form-success' : 'form-error'}>
              {message.text}
            </div>
          )}

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="pemesanan-form">
            <div className="form-group">
              <label>👤 Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            <div className="form-group">
              <label>📧 Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="email@contoh.com"
              />
            </div>

            <div className="form-group">
              <label>📞 No. Telepon</label>
              <input
                type="tel"
                name="no_telepon"
                value={formData.no_telepon}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div className="form-group">
              <label>
                {tipe === 'kuliner' ? '🍽️ Jumlah Porsi' : '🎫 Jumlah Tiket'}
              </label>
              <input
                type="number"
                name="jumlah"
                value={formData.jumlah}
                onChange={handleChange}
                min="1"
                max="10"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>
                {tipe === 'kuliner' ? '📅 Tanggal Pengambilan' : 
                 tipe === 'event' ? '📅 Tanggal Event' : '📅 Tanggal Kunjungan'}
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>📝 Catatan Tambahan</label>
              <textarea
                name="catatan"
                value={formData.catatan}
                onChange={handleChange}
                rows="3"
                placeholder={
                  tipe === 'wisata' ? "Contoh: Jam kunjungan, jumlah orang, dll." :
                  tipe === 'kuliner' ? "Contoh: Level pedas, alergi, dll." :
                  "Contoh: Pertanyaan khusus tentang event"
                }
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={onClose} 
                className="btn-cancel"
                disabled={loading}
              >
                ❌ Batal
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Memproses...
                  </>
                ) : (
                  '✅ Pesan Sekarang'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PemesananModal;