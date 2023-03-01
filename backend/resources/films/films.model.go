package films

import (
	"errors"
	"net/http"
	"strings"

	"github.com/go-chi/render"
)

type Film struct {
	FilmId      int    `gorm:"column:film_id;primaryKey;autoIncrement"`
	Title       string `gorm:"type:varchar(128)"`
	Description string `gorm:"type:text"`
	// Rating      string  `gorm:"enum('G','PG','PG-13','R','NC-17')"`
	RentalRate float64 `gorm:"type:decimal(4,2)"`
	// Actors      []actors.Actor `gorm:"many2many:film_actor;foreignKey:filmid;joinForeignKey:film_id;references:actor_id`
}

func (Film) TableName() string {
	return "film"
}

type FilmRequest struct {
	*Film
}

func (a *FilmRequest) Bind(r *http.Request) error {
	if a.Film == nil {
		return errors.New("missing required Actor fields")
	}

	a.Film.Title = strings.ToUpper(a.Film.Title)
	a.Film.Description = strings.ToUpper(a.Film.Description)
	// a.Film.Rating = strings.ToUpper(a.Film.Rating)

	return nil
}

type FilmResponse struct {
	*Film
}

func NewFilmResponse(film *Film) *FilmResponse {
	return &FilmResponse{film}
}

func NewFilmListResponse(actors []*Film) []render.Renderer {
	list := []render.Renderer{}
	for _, film := range actors {
		list = append(list, NewFilmResponse(film))
	}
	return list
}

func (a *FilmResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}
