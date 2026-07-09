package handlers

import (
	"backend/internal/database"
	"database/sql"
	"encoding/json"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var loginData User

	err := json.NewDecoder(r.Body).Decode(&loginData)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	var user User

	err = database.DB.QueryRow(`
	SELECT id, username, password
	FROM users 
	WHERE username = $1
	`, loginData.Username).Scan(&user.ID, &user.Username, &user.Password)
	if err == sql.ErrNoRows {
		http.Error(w, "Invalid Username or Password", http.StatusUnauthorized)
		return
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if loginData.Password != user.Password {
		http.Error(w, "Invalid Username or Password", http.StatusUnauthorized)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Login Sucessful",
	})
}
