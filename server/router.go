package server

import (
	"github.com/go-chi/chi/v5"
	"tsi.com/DB_Models/resources/actors"
	"tsi.com/DB_Models/resources/films"
)

func Router() chi.Router {
	router := chi.NewRouter()

	router.Mount("/actors", actors.Routes())
	router.Mount("/films", films.Routes())

	return router
}
