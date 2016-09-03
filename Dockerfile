FROM heroku/cedar:14

# install flex
RUN apt-get update \
	&& apt-get -y --force-yes install flex \
	&& rm -rf /var/cache/apt/archives/*.deb

# install golang
#  cf. https://github.com/docker-library/golang/blob/master/1.7/Dockerfile
ENV GOLANG_VERSION 1.7
ENV GOLANG_DOWNLOAD_URL https://golang.org/dl/go$GOLANG_VERSION.linux-amd64.tar.gz
ENV GOLANG_DOWNLOAD_SHA256 702ad90f705365227e902b42d91dd1a40e48ca7f67a2f4b2fd052aaa4295cd95

RUN curl -fsSL "$GOLANG_DOWNLOAD_URL" -o golang.tar.gz \
	&& echo "$GOLANG_DOWNLOAD_SHA256  golang.tar.gz" | sha256sum -c - \
	&& tar -C /usr/local -xzf golang.tar.gz \
	&& rm golang.tar.gz

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 777 "$GOPATH"

# make and install cfdg
RUN mkdir -p /tmp/cfdg
RUN curl -s http://glyphic.s3.amazonaws.com/cfa/download/ContextFreeSource3.0.9.tgz \
	| tar --strip-components=1 -xz -C /tmp/cfdg
WORKDIR /tmp/cfdg
RUN make \
	&& mkdir -p /app/usr/local/bin \
	&& cp cfdg /app/usr/local/bin
ENV PATH /app/usr/local/bin:$PATH

RUN mkdir -p /app/.profile.d \
	&& echo "export PATH=\"/app/usr/local/bin:\$PATH\"" > /app/.profile.d/cfdg.sh \
	&& echo "cd /app/user" >> /app/.profile.d/cfdg.sh

# build go-cfdg
WORKDIR /app/user
COPY . /app/user
RUN go build -o go-cfdg

ENV PORT 3000
EXPOSE 3000
