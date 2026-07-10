package handlers

import (
	"encoding/json"
	"net/http"

	"backend/internal/database"
)

type DashboardData struct {
	TotalStudents int `json:"total_students"`
	PresentToday  int `json:"present_today"`
	AbsentToday   int `json:"absent_today"`
	TotalClasses  int `json:"total_classes"`
}

func GetDashboardData(w http.ResponseWriter, r *http.Request) {

	var data DashboardData

	// Total students
	if err := database.DB.QueryRow(`
		SELECT COUNT(*)
		FROM students
	`).Scan(&data.TotalStudents); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Present students only
	if err := database.DB.QueryRow(`
		SELECT COUNT(*)
		FROM students
		WHERE is_present IS TRUE
	`).Scan(&data.PresentToday); err != nil {
	err := database.DB.QueryRow(`
		SELECT COUNT(*) FROM students
	`).Scan(&data.TotalStudents)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Absent students only
	if err := database.DB.QueryRow(`
		SELECT COUNT(*)
		FROM students
		WHERE is_present IS FALSE
	`).Scan(&data.AbsentToday); err != nil {
	// Present students
	err = database.DB.QueryRow(`
		SELECT COUNT(*)
		FROM students
		WHERE is_present = true
	`).Scan(&data.PresentToday)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Total unique classes
	if err := database.DB.QueryRow(`
		SELECT COUNT(DISTINCT class_name)
		FROM students
	`).Scan(&data.TotalClasses); err != nil {
	// Absent students
	err = database.DB.QueryRow(`
		SELECT COUNT(*)
		FROM students
		WHERE is_present = false
	`).Scan(&data.AbsentToday)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Number of classes
	err = database.DB.QueryRow(`
		SELECT COUNT(DISTINCT class_name)
		FROM students
	`).Scan(&data.TotalClasses)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
