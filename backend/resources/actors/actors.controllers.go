package actors

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	db "tsi.com/DB_Models/database"
	e "tsi.com/DB_Models/error"
)

func OptionsFunc(w http.ResponseWriter, r *http.Request) {
	//Placeholder for preflight request
}

func ListActors(w http.ResponseWriter, r *http.Request) {
	var actors []*Actor
	db.DB.Find(&actors)

	if list, err := NewActorListResponse(actors); err != nil {
		render.Render(w, r, e.ErrInvalidRequest(err))
	} else {
		render.RenderList(w, r, list)
	}
}

func DeleteActor(w http.ResponseWriter, r *http.Request) {

	queryID := chi.URLParam(r, "id")
	var actor []*Actor
	db.DB.Find(&actor, "actor_id = ?", queryID)

	if list, err := NewActorListResponse(actor); err != nil {
		render.Render(w, r, e.ErrInvalidRequest(err))
	} else {
		render.RenderList(w, r, list)
	}

	var example_actor *Actor
	db.DB.Delete(&example_actor, "actor_id = ?", queryID)
}

func ListSingleActor(w http.ResponseWriter, r *http.Request) {

	queryID := chi.URLParam(r, "id")
	var actor []*Actor
	db.DB.Find(&actor, "actor_id = ?", queryID)
	// render.Render(w, r, NewActorResponse(actor))

	if list, err := NewActorListResponse(actor); err != nil {
		render.Render(w, r, e.ErrInvalidRequest(err))
	} else {
		render.RenderList(w, r, list)
	}
}

func UpdateActor(w http.ResponseWriter, r *http.Request) {
	queryID := chi.URLParam(r, "id")
	var data ActorRequest
	if err := render.Bind(r, &data); err != nil {
		render.Render(w, r, e.ErrInvalidRequest(err))
	}

	actor := data.Actor

	db.DB.Model(&actor).Where("actor_id = ?", queryID).Updates(&actor)

	render.Status(r, http.StatusCreated)
	render.Render(w, r, NewActorResponse(actor))
}

func CreateActor(w http.ResponseWriter, r *http.Request) {
	var data ActorRequest
	if err := render.Bind(r, &data); err != nil {
		render.Render(w, r, e.ErrInvalidRequest(err))
	}

	actor := data.Actor

	db.DB.Create(actor)

	render.Status(r, http.StatusCreated)
	render.Render(w, r, NewActorResponse(actor))
}

func SearchActor(w http.ResponseWriter, r *http.Request) {

	queryName := chi.URLParam(r, "name")

	var actors []*Actor

	db.DB.Model(&actors).Where(fmt.Sprintf("first_name LIKE '%%%s%%' OR last_name LIKE '%%%s%%'", queryName, queryName)).Find(&actors)

	// if(actors[0].ActorId == 0){
	// 	render.Render(w, r, e.ErrEmptySearch(e.New("missing required Actor fields")))
	// }

	if list, err := NewActorListResponse(actors); err != nil {
		render.Render(w, r, e.ErrInvalidRequest(err))
	} else {
		render.RenderList(w, r, list)
	}

}

func SearchActorFilms(w http.ResponseWriter, r *http.Request) {

	queryID := chi.URLParam(r, "id")
	var actor []*Actor

	db.DB.Preload("Films").Find(&actor, "actor_id = ?", queryID)

	if list, err := NewActorListResponse(actor); err != nil {
		render.Render(w, r, e.ErrInvalidRequest(err))
	} else {
		render.RenderList(w, r, list)
	}
}
