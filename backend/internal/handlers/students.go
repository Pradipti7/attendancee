package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"backend/internal/database"
	"backend/internal/models"

	"github.com/go-chi/chi/v5"
)

// GET ALL STUDENTS
func GetStudents(w http.ResponseWriter, r *http.Request) {

	rows, err := database.DB.Query(`
		SELECT
			id,
			name,
			class_name,
			email,
			address,
			number,
			is_present
		FROM students
		ORDER BY id;
	`)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var students []models.Student

	for rows.Next() {

		var student models.Student

		err := rows.Scan(
			&student.ID,
			&student.Name,
			&student.ClassName,
			&student.Email,
			&student.Address,
			&student.Number,
			&student.IsPresent,
		)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		students = append(students, student)
	}
	// Check for errors during iteration
	if err = rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(students)
}

// ADD STUDENT
func AddStudent(w http.ResponseWriter, r *http.Request) {

	var student models.Student

	err := json.NewDecoder(r.Body).Decode(&student)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	err = database.DB.QueryRow(`
		INSERT INTO students
		(name, class_name, email, address, number)
		VALUES ($1,$2,$3,$4,$5)
		RETURNING id;
	`,
		student.Name,
		student.ClassName,
		student.Email,
		student.Address,
		student.Number,
	).Scan(&student.ID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	student.IsPresent = nil

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(student)
}

// UPDATE ATTENDANCE
func UpdateAttendance(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")

	studentID, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Invalid student ID", http.StatusBadRequest)
		return
	}

	var attendance struct {
		IsPresent *bool `json:"is_present"`
	}

	err = json.NewDecoder(r.Body).Decode(&attendance)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	_, err = database.DB.Exec(`
		UPDATE students
		SET is_present = $1
		WHERE id = $2;
	`,
		attendance.IsPresent,
		studentID,
	)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Attendance updated successfully",
	})
}
