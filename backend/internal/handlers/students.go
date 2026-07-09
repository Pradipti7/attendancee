package handlers

import (
	"net/http"

	"backend/internal/database"
)

// get all students
func GetStudents(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query(`
	SELECT 
	id, name, class_name, email, address, number, is_present
	FROM students
	ORDER BY id; 
	`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
