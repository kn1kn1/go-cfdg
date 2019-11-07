# Building cfdg binary for Heroku envirionment

## Requirements
- [Docker](https://www.docker.com/) - 19.03.4
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) - 7.34.2

## Procedure
### Run following command locally
```sh
$ git clone https://github.com/kn1kn1/go-cfdg.git
$ cd go-cfdg/build-cfdg
$ heroku login
$ heroku container:login
$ heroku container:push web -a cfdg-staging
$ heroku container:release web -a cfdg-staging
```

### Run following command in the `heroku run bash` console
```sh
$ mkdir -p /tmp/cfdg \
    && curl -s -L https://github.com/MtnViewJohn/context-free/archive/Version3.2_2.tar.gz \
	| tar --strip-components=1 -xz -C /tmp/cfdg
$ cd /tmp/cfdg
$ make
$ curl --upload-file cfdg https://transfer.sh/cfdg-v3.2.2
```
Then you can get the url like https://transfer.sh/XkM5E/cfdg-v3.2.2 and download cfdg binary from there.

