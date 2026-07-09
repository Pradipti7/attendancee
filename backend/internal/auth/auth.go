package auth

import (
	"net/http"
)

func RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Authentication will be added later.
		// For now, every request is allowed.

		next.ServeHTTP(w, r)
	})
}
