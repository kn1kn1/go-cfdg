FROM golang:1.23-bookworm AS builder

# install dependencies
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

# build go-cfdg
WORKDIR /app/user
COPY . /app/user
RUN go build -o go-cfdg


FROM debian:bookworm-slim
# install dependencies
RUN apt-get update \
	&& apt-get -y --force-yes --no-install-recommends install libpng-dev libicu-dev \
	&& rm -rf /var/cache/apt/archives/*.deb

COPY --from=builder /app/user/local/bin/cfdg /app/user/local/bin/cfdg
COPY --from=builder /app/user/go-cfdg /app/user/go-cfdg
ENV PATH=/app/user/local/bin:$PATH

WORKDIR /app/user
COPY . /app/user

# start go-cfdg
ENV PORT=3000
EXPOSE 3000
ENTRYPOINT ["./go-cfdg"]
