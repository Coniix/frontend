package main

import (
	"tsi.com/DB_Models/database"
	"tsi.com/DB_Models/resources/actors"
	"tsi.com/DB_Models/resources/films"
	"tsi.com/DB_Models/server"
)

func main() {
	database.Init()
	database.DB.AutoMigrate(&actors.Actor{}, &films.Film{})

	server.Init()
}
