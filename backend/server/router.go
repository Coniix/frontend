package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/Coniix/go-react-app/resources/actors"
	"github.com/Coniix/go-react-app/resources/films"
)

func Router() chi.Router {
	router := chi.NewRouter()

	router.Mount("/actors", actors.Routes())
	router.Mount("/films", films.Routes())

	return router
}
