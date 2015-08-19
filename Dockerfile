FROM heroku/cedar:14

# install flex
RUN apt-get update
RUN apt-get -y --force-yes install flex
RUN rm -rf /var/cache/apt/archives/*.deb

# install golang
ENV GOLANG_VERSION 1.4.2
RUN mkdir -p /usr/src
RUN curl -sSL https://golang.org/dl/go$GOLANG_VERSION.src.tar.gz \
		| tar -v -C /usr/src -xz
RUN cd /usr/src/go/src && ./make.bash --no-clean 2>&1
ENV PATH /usr/src/go/bin:$PATH
RUN mkdir -p /go/src /go/bin && chmod -R 777 /go
ENV GOPATH /go
ENV PATH /go/bin:$PATH

RUN useradd -d /app -m app
USER app
WORKDIR /app

ENV HOME /app
ENV PORT 3000

# make and install cfdg
RUN mkdir -p /tmp/cfdg
RUN curl -s http://glyphic.s3.amazonaws.com/cfa/download/ContextFreeSource3.0.9.tgz \
    | tar --strip-components=1 -xz -C /tmp/cfdg
WORKDIR /tmp/cfdg
RUN make
RUN mkdir -p /app/usr/local/bin
RUN cp cfdg /app/usr/local/bin
ENV PATH /app/usr/local/bin:$PATH

RUN mkdir -p /app/.profile.d
RUN echo "export PATH=\"/app/usr/local/bin:\$PATH\"" > /app/.profile.d/cfdg.sh
RUN echo "cd /app/web" >> /app/.profile.d/cfdg.sh

RUN mkdir -p /app/web
WORKDIR /app/web

COPY . /app/web
RUN cd /app/web && go build -o go-cfdg
EXPOSE 3000
