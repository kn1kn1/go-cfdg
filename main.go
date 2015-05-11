package main

import (
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"os/exec"
)

const basePath = "/"
const viewsPath = "./views"

var templIndex = template.Must(template.ParseFiles(viewsPath + "/index.html"))

func main() {
	http.Handle("/css/", http.StripPrefix("/css", http.FileServer(http.Dir(viewsPath+"/css"))))
	http.Handle("/js/", http.StripPrefix("/js", http.FileServer(http.Dir(viewsPath+"/js"))))

	http.Handle("/", http.HandlerFunc(handleRoot))
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}

func handleRoot(w http.ResponseWriter, req *http.Request) {
	fmt.Printf("req.URL.Path: %s\n", req.URL.Path)
	basePathLen := len(basePath)
	fmt.Printf("req.URL.Path[basePathLen:]: %s\n", req.URL.Path[basePathLen:])
	path := req.URL.Path[basePathLen:]

	switch path {
	case "", "index.html":
		handleIndex(w, req)
	case "render":
		render(w, req)
	default:
		http.Error(w, "404 Not Found", http.StatusNotFound)
		return
	}
}

func handleIndex(w http.ResponseWriter, req *http.Request) {
	templIndex.Execute(w, nil)
}

func render(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "GET expected", http.StatusMethodNotAllowed)
		return
	}

	u := r.URL
	v := u.Query()
	code := v.Get("code")
	fmt.Printf("code: %s\n", code)

	// cmd := exec.Command("/app/usr/local/bin/cfdg", "/app/src/Clovers.cfdg");
	cmd := exec.Command("cfdg", "-")

	reader, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Printf("err: %s\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	errReader, err := cmd.StderrPipe()
	if err != nil {
		fmt.Printf("err: %s\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		reader.Close()
		return
	}

	writer, err := cmd.StdinPipe()
	if err != nil {
		fmt.Printf("err: %s\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		reader.Close()
		errReader.Close()
		return
	}

	go io.Copy(os.Stderr, errReader)

	w.Header().Set("Content-Type", "image/png")
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Expires", "0")

	// writer.Write([]byte("startshape C rule C{CIRCLE{}5*{r-72}C{s 1 .4r-45x 5}}"))
	writer.Write([]byte(code))
	writer.Close()

	err = cmd.Start()
	if err != nil {
		fmt.Printf("err: %s\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		reader.Close()
		errReader.Close()
		return
	}

	// io.Copy(os.Stdout, reader)
	io.Copy(w, reader)

	reader.Close()
	errReader.Close()
}
