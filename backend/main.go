package main

import (
	"log"
	"net/http"

	"backend/internal/auth"
	"backend/internal/database"
	"backend/internal/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}
	// Database connection
	database.Connect()

	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	}))

	// Authentication Routes

	r.Post("/signup", handlers.Signup)
	r.Post("/login", handlers.Login)
	r.Post("/logout", handlers.Logout)

	// Student handling Routes

	r.Get("/students", handlers.GetStudents)
	r.Post("/students", handlers.AddStudent)
	r.Put("/students/{id}", handlers.UpdateAttendance)

	// Protected Routes

	r.Group(func(protected chi.Router) {

		protected.Use(auth.RequireAuth)

		protected.Get("/dashboard-data", handlers.GetDashboardData)

	})

	log.Println("Server started on http://localhost:8080")

	log.Fatal(http.ListenAndServe(":8080", r))
}
