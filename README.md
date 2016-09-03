# go-cfdg
The source behind Context Free Art Playground at [cfdg.herokuapp.com](https://cfdg.herokuapp.com/).

## Requirements
- [Docker Toolbox](https://www.docker.com/toolbox) - 1.12.0
  - docker-compose - 1.8.0
- Heroku Toolbelt - 3.43.10
- [`heroku-docker`](https://devcenter.heroku.com/articles/introduction-local-development-with-docker) Toolbelt plugin - 2.0.1

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
$ docker-compose up web
$ open "http://$(docker-machine ip default):3000"
```

## Deploying to Heroku
```sh
$ git clone https://github.com/kn1kn1/go-cfdg.git
$ cd go-cfdg
$ heroku create
$ heroku docker:release
$ heroku open
```

## Build Status

[![Build Status](https://travis-ci.org/kn1kn1/go-cfdg.svg?branch=master)](https://travis-ci.org/kn1kn1/go-cfdg)
[![Circle CI](https://circleci.com/gh/kn1kn1/go-cfdg.svg?style=shield)](https://circleci.com/gh/kn1kn1/go-cfdg)
