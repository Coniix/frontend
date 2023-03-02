package actors

import "github.com/go-chi/chi/v5"

func Routes() chi.Router {
	router := chi.NewRouter()

	//Placeholder for preflight request
	router.Options("/", OptionsFunc)
	router.Options("/{id}", OptionsFunc)

	router.Get("/", ListActors)
	router.Post("/", CreateActor)
	router.Get("/{id}", ListSingleActor)
	router.Patch("/{id}", UpdateActor)
	router.Delete("/{id}", DeleteActor)

	router.Get("/search/{name}", SearchActor)
	router.Get("/search/films/{id}", SearchActorFilms)

	return router
}
