package films

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	db "tsi.com/DB_Models/database"
)

func ListFilms(w http.ResponseWriter, r *http.Request) {
	var films []*Film
	db.DB.Find(&films)
	render.RenderList(w, r, NewFilmListResponse(films))
}

func ListSingleFilm(w http.ResponseWriter, r *http.Request) {

	queryID := chi.URLParam(r, "id")
	var film *Film
	db.DB.Find(&film, "actor_id = ?", queryID)
	render.Render(w, r, NewFilmResponse(film))
}

func SearchFilm(w http.ResponseWriter, r *http.Request) {

	queryName := chi.URLParam(r, "name")

	var film []*Film

	db.DB.Model(&film).Where(fmt.Sprintf("title LIKE '%%%s%%'", queryName)).Find(&film)
	render.RenderList(w, r, NewFilmListResponse(film))
}
