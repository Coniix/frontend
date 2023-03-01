package main

import (
	"github.com/Coniix/go-react-app/database"
	"github.com/Coniix/go-react-app/resources/actors"
	"github.com/Coniix/go-react-app/resources/films"
	"github.com/Coniix/go-react-app/server"
)

func main() {
	database.Init()
	database.DB.AutoMigrate(&actors.Actor{}, &films.Film{})

	server.Init()
}
