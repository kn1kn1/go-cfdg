FROM heroku/heroku:18

# install flex
RUN apt-get update \
	&& apt-get -y --force-yes --no-install-recommends install flex libfl-dev bison libpng-dev g++ libicu-dev \
	&& rm -rf /var/cache/apt/archives/*.deb

RUN mkdir -p /tmp/cfdg \
    && curl -s -L https://github.com/MtnViewJohn/context-free/archive/Version3.2_2.tar.gz \
	| tar --strip-components=1 -xz -C /tmp/cfdg
# WORKDIR /tmp/cfdg
# RUN make