package handlers

import (
	"backend/internal/database"
	"encoding/json"
	"net/http"
)

type DashboardData struct {
	TotalStudents int `json:"total_students"`
	PresentToday  int `json:"present_today"`
	AbsentToday   int `json:"absent_today"`
	TotalClasses  int `json:"total_classes"`
}

func GetDashboardData(w http.ResponseWriter, r *http.Request) {
	var data DashboardData

	// for total students
	err := database.DB.QueryRow(`
	SELECT COUNT (*) FROM students
	`).Scan(&data.TotalStudents)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// for present students
	err = database.DB.QueryRow(`
	SELECT COUNT (*)
	FROM students
	WHERE is_present =true
	`).Scan(&data.PresentToday)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// for absent students
	err = database.DB.QueryRow(`
SELECT COUNT(*)
FROM students
WHERE is_present-false`).Scan(&data.PresentToday)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)

}
