# go-cfdg
The source behind [Context Free Art](http://www.contextfreeart.org/) Playground at [cfdg.herokuapp.com](https://cfdg.herokuapp.com/).

## Requirements
- Docker
- Heroku Toolbelt
- [`heroku-docker`](https://devcenter.heroku.com/articles/introduction-local-development-with-docker) Toolbelt plugin

## Running Locally
```sh
$ git clone https://github.com/kn1kn1/go-cfdg.git
$ cd go-cfdg
$ heroku docker:start
```

## Deploying to Heroku
```sh
$ git clone https://github.com/kn1kn1/go-cfdg.git
$ cd go-cfdg
$ heroku create
$ heroku docker:release
$ heroku open
```
