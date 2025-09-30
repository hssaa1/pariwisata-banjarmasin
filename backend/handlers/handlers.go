package handlers

import (
	"net/http"
	"pariwisata-banjarmasin/database"
	"pariwisata-banjarmasin/models"

	"github.com/gin-gonic/gin"
)

// GetAllWisata - Get all wisata destinations
func GetAllWisata(c *gin.Context) {
	var wisata []models.Wisata
	result := database.DB.Find(&wisata)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch wisata data",
		})
		return
	}

	c.JSON(http.StatusOK, wisata)
}

// GetAllEvents - Get all events
func GetAllEvents(c *gin.Context) {
	var events []models.Event
	result := database.DB.Find(&events)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch events data",
		})
		return
	}

	c.JSON(http.StatusOK, events)
}

// GetAllKuliner - Get all culinary items
func GetAllKuliner(c *gin.Context) {
	var kuliner []models.Kuliner
	result := database.DB.Find(&kuliner)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch kuliner data",
		})
		return
	}

	c.JSON(http.StatusOK, kuliner)
}

// GetWisataByID - Get single wisata by ID
func GetWisataByID(c *gin.Context) {
	id := c.Param("id")
	var wisata models.Wisata
	result := database.DB.First(&wisata, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Wisata not found",
		})
		return
	}

	c.JSON(http.StatusOK, wisata)
}

// GetKulinerByID - Get single kuliner by ID
func GetKulinerByID(c *gin.Context) {
	id := c.Param("id")
	var kuliner models.Kuliner
	result := database.DB.First(&kuliner, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Kuliner not found",
		})
		return
	}

	c.JSON(http.StatusOK, kuliner)
}
