package main

import (
	"log"
	"net/http"

	_ "./statik"

	"github.com/rakyll/statik/fs"
)

func main() {
	statikFS, err := fs.New()
	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/", http.FileServer(statikFS))
	http.ListenAndServe(":8000", nil)
}
