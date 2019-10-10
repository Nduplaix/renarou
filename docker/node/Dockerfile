FROM node:10.15.2-alpine

RUN apk add --no-cache \
    nano \
    bash \
    bash-doc \
    bash-completion

RUN apk add --no-cache su-exec && \
    addgroup bar && \
    adduser -D -h /home -s /bin/sh -G bar foo

RUN npm install -g @vue/cli

ADD entrypoint.sh /entrypoint

WORKDIR /srv
ENTRYPOINT ["/entrypoint"]
