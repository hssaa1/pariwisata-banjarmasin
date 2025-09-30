package main

import (
	"fmt"
	"log"
	"pariwisata-banjarmasin/database"
	"pariwisata-banjarmasin/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDatabase()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.Static("/images", "./images")

	router.GET("/api/wisata", handlers.GetAllWisata)
	router.GET("/api/events", handlers.GetAllEvents)
	router.GET("/api/kuliner", handlers.GetAllKuliner)

	fmt.Println("🚀 Server running on http://localhost:8080")
	fmt.Println("📁 Static files served from /images")
	log.Fatal(router.Run(":8080"))
}
