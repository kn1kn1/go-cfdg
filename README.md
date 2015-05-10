# go-cfdg

The source behind [Context Free Art](http://www.contextfreeart.org/) Playground at [cfdg.herokuapp.com](https://cfdg.herokuapp.com/).

## Requirements
- Go
- Docker
- Heroku Toolbelt
- [`heroku-docker`](https://devcenter.heroku.com/articles/introduction-local-development-with-docker) Toolbelt plugin

## Running Locally
```sh
$ git clone git@github.com:kn1kn1/go-cfdg.git
$ cd go-cfdg
$ GOOS=linux GOARCH=amd64 go build
$ heroku docker:start
```

## Deploying to Heroku
```sh
$ git clone git@github.com:kn1kn1/go-cfdg.git
$ cd go-cfdg
$ GOOS=linux GOARCH=amd64 go build
$ heroku create
$ heroku docker:release
$ heroku open
```
