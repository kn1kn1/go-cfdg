# go-cfdg
The source behind Context Free Art Playground at [cfdg.herokuapp.com](https://cfdg.herokuapp.com/).

## Requirements
- [Docker](https://www.docker.com/) - 19.03.4
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) - 7.34.2

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

## Deploying to Heroku
https://devcenter.heroku.com/articles/container-registry-and-runtime
```sh
$ git clone https://github.com/kn1kn1/go-cfdg.git
$ cd go-cfdg
$ heroku login
$ heroku container:login
$ heroku container:push web -a cfdg
$ heroku container:release web -a cfdg
$ heroku open
```

## Build Status

[![Build Status](https://travis-ci.org/kn1kn1/go-cfdg.svg?branch=master)](https://travis-ci.org/kn1kn1/go-cfdg)
[![Circle CI](https://circleci.com/gh/kn1kn1/go-cfdg.svg?style=shield)](https://circleci.com/gh/kn1kn1/go-cfdg)
