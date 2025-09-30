package database

import (
	"fmt"
	"pariwisata-banjarmasin/models"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("pariwisata.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	fmt.Println("✅ Database connection successfully opened")

	// Auto Migrate
	err = DB.AutoMigrate(&models.Wisata{}, &models.Event{}, &models.Kuliner{}, &models.Pemesanan{})
	if err != nil {
		panic("❌ Failed to migrate database: " + err.Error())
	}

	// Seed data
	SeedData()
}

func SeedData() {
	baseURL := "http://localhost:8080"

	// Data wisata
	wisata := []models.Wisata{
		{
			Nama:       "Pasar Terapung Lok Baintan",
			Deskripsi:  "Pasar tradisional unik di atas sungai dengan perahu-perahu jual beli sayuran dan hasil bumi",
			Lokasi:     "Lok Baintan, Sungai Martapura",
			Gambar:     baseURL + "/images/pasar_terapung.jpeg",
			Kategori:   "Budaya",
			HargaTiket: 0,
			Rating:     4.8,
			CreatedAt:  time.Now(),
			UpdatedAt:  time.Now(),
		},
		{
			Nama:       "Masjid Sultan Suriansyah",
			Deskripsi:  "Masjid tertua di Kalimantan Selatan dengan arsitektur tradisional Banjar yang autentik",
			Lokasi:     "Jalan Kuin Utara, Banjarmasin Utara",
			Gambar:     baseURL + "/images/masjid_sultan_suriansyah.jpeg",
			Kategori:   "Religi",
			HargaTiket: 0,
			Rating:     4.6,
			CreatedAt:  time.Now(),
			UpdatedAt:  time.Now(),
		},
		{
			Nama:       "Taman Siring",
			Deskripsi:  "Taman tepi sungai Martapura yang menjadi tempat rekreasi keluarga favorit",
			Lokasi:     "Jalan Siring, Banjarmasin Tengah",
			Gambar:     baseURL + "/images/taman_siring.jpeg",
			Kategori:   "Rekreasi",
			HargaTiket: 5000,
			Rating:     4.3,
			CreatedAt:  time.Now(),
			UpdatedAt:  time.Now(),
		},
	}

	// Data event
	events := []models.Event{
		{
			Nama:      "Festival Pasar Terapung",
			Deskripsi: "Festival tahunan menampilkan budaya dan tradisi pasar terapung dengan pertunjukan seni dan kuliner",
			Tanggal:   time.Now().AddDate(0, 1, 15),
			Lokasi:    "Lok Baintan, Sungai Martapura",
			Gambar:    baseURL + "/images/pasar_terapung.jpeg",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			Nama:      "Karnaval Budaya Banjar",
			Deskripsi: "Pawai budaya dengan pakaian tradisional Banjar, tarian, dan musik tradisional",
			Tanggal:   time.Now().AddDate(0, 2, 0),
			Lokasi:    "Jalan Lambung Mangkurat, Banjarmasin",
			Gambar:    baseURL + "/images/karnaval_budaya_banjar.jpeg",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}

	// Data kuliner
	kuliner := []models.Kuliner{
		{
			Nama:      "Soto Banjar",
			Deskripsi: "Soto khas Banjarmasin dengan kuah bening, daging ayam, perkedal kentang, dan telur bebek",
			Lokasi:    "Warung Soto Banjar Asli - Jl. Pangeran Samudera",
			Gambar:    baseURL + "/images/soto_banjar.jpeg",
			Harga:     25000,
			Rating:    4.7,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			Nama:      "Ketupat Kandangan",
			Deskripsi: "Ketupat dengan sayur nangka muda, kuah santan gurih, dan tambahan telur atau daging",
			Lokasi:    "Rumah Makan Ketupat Kandangan - Jl. Veteran",
			Gambar:    baseURL + "/images/ketupat_kandangan.jpeg",
			Harga:     20000,
			Rating:    4.5,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}

	// Clear existing data dulu (lebih aman)
	DB.Unscoped().Where("1 = 1").Delete(&models.Wisata{})
	DB.Unscoped().Where("1 = 1").Delete(&models.Event{})
	DB.Unscoped().Where("1 = 1").Delete(&models.Kuliner{})

	// Insert baru
	for _, w := range wisata {
		DB.Create(&w)
	}
	for _, e := range events {
		DB.Create(&e)
	}
	for _, k := range kuliner {
		DB.Create(&k)
	}

	fmt.Println("✅ Database seeded successfully!")
	fmt.Println("📊 Data created:")
	fmt.Println("   -", len(wisata), "wisata destinations")
	fmt.Println("   -", len(events), "events")
	fmt.Println("   -", len(kuliner), "culinary items")
}
