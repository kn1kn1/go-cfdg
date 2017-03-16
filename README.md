# go-cfdg
The source behind Context Free Art Playground at [cfdg.herokuapp.com](https://cfdg.herokuapp.com/).

## Requirements
- [Docker Toolbox](https://www.docker.com/toolbox) - 1.11.2
  - docker-compose - 1.7.1
- Heroku Toolbelt - 3.43.9999
- [`heroku-container-registry`](https://devcenter.heroku.com/articles/container-registry-and-runtime) plugin - 4.1.1

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

https://devcenter.heroku.com/articles/container-registry-and-runtime

```sh
$ git clone https://github.com/kn1kn1/go-cfdg.git
$ cd go-cfdg
$ heroku login
$ heroku container:login
$ heroku container:push -a <app>
$ heroku open -a <app>
```

## Build Status

[![Build Status](https://travis-ci.org/kn1kn1/go-cfdg.svg?branch=master)](https://travis-ci.org/kn1kn1/go-cfdg)
[![Circle CI](https://circleci.com/gh/kn1kn1/go-cfdg.svg?style=shield)](https://circleci.com/gh/kn1kn1/go-cfdg)
