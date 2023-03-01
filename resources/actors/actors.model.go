package actors

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/render"
)

type Actor struct {
	ActorId    int       `gorm:"column:actor_id;primaryKey;autoIncrement"`
	FirstName  string    `gorm:"type:varchar(45)"`
	LastName   string    `gorm:"type:varchar(45)"`
	LastUpdate time.Time `gorm:"autoCreateTime"`
	Films      []Film    `gorm:"many2many:film_actor;foreignKey:actor_id;joinForeignKey:actor_id;references:film_id;joinReferences:film_id"`
}

type Film struct {
	FilmId      int    `gorm:"column:film_id;primaryKey;autoIncrement"`
	Title       string `gorm:"type:varchar(128)"`
	Description string `gorm:"type:text"`
	// Rating      string  `gorm:"enum('G','PG','PG-13','R','NC-17')"`
	RentalRate float64 `gorm:"type:decimal(4,2)"`
	// Actors      []actors.Actor `gorm:"many2many:film_actor;foreignKey:filmid;joinForeignKey:film_id;references:actor_id`
}

type FilmActor struct {
	ActorId int `gorm:"primaryKey"`
	FilmId  int `gorm:"primaryKey"`
}

func (Actor) TableName() string {
	return "actor"
}

func (Film) TableName() string {
	return "film"
}

func (FilmActor) TableName() string {
	return "film_actor"
}

type ActorRequest struct {
	*Actor
}

type ActorResponse struct {
	*Actor
}

func (a *ActorRequest) Bind(r *http.Request) error {
	if a.Actor == nil {
		return errors.New("missing required Actor fields")
	}

	a.Actor.FirstName = strings.ToUpper(a.Actor.FirstName)
	a.Actor.LastName = strings.ToUpper(a.Actor.LastName)

	return nil
}

func (a *ActorResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func NewActorResponse(actor *Actor) *ActorResponse {
	return &ActorResponse{actor}
}

func NewActorListResponse(actors []*Actor) ([]render.Renderer, error) {
	list := []render.Renderer{}

	if len(actors) == 0 {
		return list, errors.New("zero results for search criteria")
	}

	for _, actor := range actors {
		list = append(list, NewActorResponse(actor))
	}
	return list, nil
}
