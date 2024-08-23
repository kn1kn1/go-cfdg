FROM golang:1.23-bullseye

# install flex
RUN apt-get update \
	&& apt-get -y --force-yes --no-install-recommends install flex libfl-dev bison libpng-dev g++ libicu-dev \
	&& rm -rf /var/cache/apt/archives/*.deb

# build cfdg
RUN mkdir -p /tmp/cfdg \
    && curl -s -L https://github.com/MtnViewJohn/context-free/archive/refs/tags/Version3.4.1.tar.gz \
	| tar --strip-components=1 -xz -C /tmp/cfdg
WORKDIR /tmp/cfdg
RUN make
RUN chmod +x cfdg \
	&& mkdir -p /app/user/local/bin \
	&& cp cfdg /app/user/local/bin
ENV PATH=/app/user/local/bin:$PATH

# build go-cfdg
WORKDIR /app/user
COPY . /app/user
RUN go build -o go-cfdg

# start go-cfdg
ENV PORT=3000
EXPOSE 3000
ENTRYPOINT ["./go-cfdg"]
