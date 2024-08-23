# go-cfdg
Context Free Art Playground

## Requirements
- [cfdg](https://www.contextfreeart.org/downloads.html) - 3.4.1
- [Docker](https://www.docker.com/) - 27.1.1

## Running Locally with Go
```sh
$ git clone https://github.com/kn1kn1/go-cfdg.git
$ cd go-cfdg
$ PORT=3000 go run main.go
$ open "http://localhost:3000"
```

## Running Locally with Docker
```sh
$ git clone https://github.com/kn1kn1/go-cfdg.git
$ cd go-cfdg
$ docker build -t cfdg . 
$ docker run -e "PORT=3000" -p 3000:3000 -t cfdg
$ open "http://localhost:3000"
```

## Build Status

[![Circle CI](https://circleci.com/gh/kn1kn1/go-cfdg.svg?style=shield)](https://circleci.com/gh/kn1kn1/go-cfdg)
