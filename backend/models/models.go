package models

import (
	"time"
)

type Wisata struct {
	ID         uint      `json:"id" gorm:"primary_key"`
	Nama       string    `json:"nama" gorm:"not null"`
	Deskripsi  string    `json:"deskripsi" gorm:"type:text"`
	Lokasi     string    `json:"lokasi"`
	Gambar     string    `json:"gambar"`
	Kategori   string    `json:"kategori"`
	HargaTiket float64   `json:"harga_tiket"`
	Rating     float64   `json:"rating"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type Event struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Nama      string    `json:"nama" gorm:"not null"`
	Deskripsi string    `json:"deskripsi" gorm:"type:text"`
	Tanggal   time.Time `json:"tanggal"`
	Lokasi    string    `json:"lokasi"`
	Gambar    string    `json:"gambar"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Kuliner struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Nama      string    `json:"nama" gorm:"not null"`
	Deskripsi string    `json:"deskripsi" gorm:"type:text"`
	Lokasi    string    `json:"lokasi"`
	Gambar    string    `json:"gambar"`
	Harga     float64   `json:"harga"`
	Rating    float64   `json:"rating"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Pemesanan struct {
	ID         uint      `json:"id" gorm:"primary_key"`
	Nama       string    `json:"nama" gorm:"not null"`
	Email      string    `json:"email" gorm:"not null"`
	NoTelepon  string    `json:"no_telepon" gorm:"not null"`
	Tipe       string    `json:"tipe" gorm:"not null"`
	ItemID     uint      `json:"item_id" gorm:"not null"`
	ItemNama   string    `json:"item_nama"`
	Jumlah     int       `json:"jumlah" gorm:"not null"`
	TotalHarga float64   `json:"total_harga"`
	Tanggal    time.Time `json:"tanggal" gorm:"not null"`
	Status     string    `json:"status" gorm:"default:'pending'"`
	Catatan    string    `json:"catatan" gorm:"type:text"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
