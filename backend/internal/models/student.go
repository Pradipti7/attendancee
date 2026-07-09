package models

type Student struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	ClassName string `json:"class_name"`
	Email     string `json:"email"`
	Address   string `json:"address"`
	Number    string `json:"number"`
	IsPresent *bool  `json:"is_present"`
}
