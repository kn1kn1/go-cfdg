package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"time"
)

const (
	basePath   = "/"
	viewsPath  = "./views"
	cmdTimeout = 15 * time.Second
)

var templIndex = template.Must(template.ParseFiles(viewsPath + "/index.html"))

func main() {
	http.Handle("/css/", http.StripPrefix("/css", http.FileServer(http.Dir(viewsPath+"/css"))))
	http.Handle("/image/", http.StripPrefix("/image", http.FileServer(http.Dir(viewsPath+"/image"))))
	http.Handle("/js/", http.StripPrefix("/js", http.FileServer(http.Dir(viewsPath+"/js"))))

	http.Handle("/", http.HandlerFunc(handleRoot))
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}

func handleRoot(w http.ResponseWriter, req *http.Request) {
	log.Printf("req.URL.Path: %s\n", req.URL.Path)
	basePathLen := len(basePath)
	log.Printf("req.URL.Path[basePathLen:]: %s\n", req.URL.Path[basePathLen:])
	path := req.URL.Path[basePathLen:]

	switch path {
	case "", "index.html":
		handleIndex(w, req)
	case "render":
		render(w, req)
	case "check":
		check(w, req)
	default:
		http.Error(w, "404 Not Found", http.StatusNotFound)
		return
	}
}

func handleIndex(w http.ResponseWriter, req *http.Request) {
	templIndex.Execute(w, nil)
}

func handleErr(w http.ResponseWriter, err error, reader io.ReadCloser, errReader io.ReadCloser) {
	log.Printf("err: %v\n", err)
	http.Error(w, err.Error(), http.StatusInternalServerError)
	if reader != nil {
		reader.Close()
	}
	if errReader != nil {
		errReader.Close()
	}
}

func check(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "GET expected", http.StatusMethodNotAllowed)
		return
	}

	u := r.URL
	v := u.Query()
	code := v.Get("code")
	log.Printf("check code: %s\n", code)

	cmd := exec.Command("cfdg", "-C", "-")

	reader, err := cmd.StdoutPipe()
	if err != nil {
		handleErr(w, err, nil, nil)
		return
	}

	errReader, err := cmd.StderrPipe()
	if err != nil {
		handleErr(w, err, reader, nil)
		return
	}

	writer, err := cmd.StdinPipe()
	if err != nil {
		handleErr(w, err, reader, errReader)
		return
	}

	// writer.Write([]byte("startshape C rule C{CIRCLE{}5*{r-72}C{s 1 .4r-45x 5}}"))
	writer.Write([]byte(code))
	writer.Close()

	err = cmd.Start()
	if err != nil {
		handleErr(w, err, reader, errReader)
		return
	}

	buf := new(bytes.Buffer)
	buf.ReadFrom(errReader)
	errStr := buf.String()
	log.Printf("check output: %s\n", errStr)
	message := strings.Replace(errStr, "Reading rules file -\n", "", -1)
	reader.Close()
	errReader.Close()

	type Response struct {
		Error   bool
		Message string
	}
	response := Response{
		Error:   strings.Contains(message, "Error"),
		Message: message,
	}
	jsonBytes, err := json.Marshal(response)
	if err != nil {
		handleErr(w, err, nil, nil)
		return
	}
	// os.Stdout.Write(jsonBytes)

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)
}

func render(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "GET expected", http.StatusMethodNotAllowed)
		return
	}

	u := r.URL
	v := u.Query()
	code := v.Get("code")
	log.Printf("render code: %s\n", code)
	variation := v.Get("v")
	log.Printf("render variation: %s\n", variation)

	// cmd := exec.Command("/app/usr/local/bin/cfdg", "/app/web/Clovers.cfdg");
	var cmd *exec.Cmd
	if len(variation) > 0 {
		cmd = exec.Command("cfdg", "-v", variation, "-")
	} else {
		cmd = exec.Command("cfdg", "-")
	}

	reader, err := cmd.StdoutPipe()
	if err != nil {
		handleErr(w, err, nil, nil)
		return
	}

	errReader, err := cmd.StderrPipe()
	if err != nil {
		handleErr(w, err, reader, nil)
		return
	}

	writer, err := cmd.StdinPipe()
	if err != nil {
		handleErr(w, err, reader, errReader)
		return
	}

	go io.Copy(os.Stderr, errReader)

	w.Header().Set("Content-Type", "image/png")

	// writer.Write([]byte("startshape C rule C{CIRCLE{}5*{r-72}C{s 1 .4r-45x 5}}"))
	writer.Write([]byte(code))
	writer.Close()

	err = cmd.Start()
	if err != nil {
		handleErr(w, err, reader, errReader)
		return
	}

	done := make(chan error, 1)
	go func() {
		defer func() {
			if r := recover(); r != nil {
				log.Printf("got panic while io.Copy(w, reader) and recovered - %v", r)
			}
		}()
		// _, err := io.Copy(os.Stdout, reader)
		_, err := io.Copy(w, reader)
		done <- err
	}()

	select {
	case <-time.After(cmdTimeout):
		err := cmd.Process.Kill()
		if err != nil {
			log.Printf("failed to kill: %v\n", err)
		}
		<-done // allow goroutine to exit
		err = errors.New("cfdg cmd timeout! process killed")
		handleErr(w, err, reader, errReader)
	case err := <-done:
		if err != nil {
			log.Printf("process done with error = %v\n", err)
			handleErr(w, err, reader, errReader)
		}
	}

	reader.Close()
	errReader.Close()
}
