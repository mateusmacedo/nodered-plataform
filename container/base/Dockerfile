ARG ARCH=amd64
ARG NODE_VERSION=20
ARG OS=alpine

#### Stage BASE ########################################################################################################
FROM ${ARCH}/node:${NODE_VERSION}-${OS} AS base

# Copy scripts
COPY ./container/base/scripts/*.sh /tmp/

# Install tools, create Node-RED app and data dir, add user and set rights
RUN set -ex && \
    apk add --no-cache \
    bash \
    tzdata \
    iputils \
    curl \
    nano \
    git \
    openssl \
    openssh-client \
    ca-certificates && \
    mkdir -p /usr/src/node-red /data && \
    deluser --remove-home node && \
    adduser -h /usr/src/node-red -D -H node-red -u 1000 && \
    chown -R node-red:root /data && chmod -R g+rwX /data && \
    chown -R node-red:root /usr/src/node-red && chmod -R g+rwX /usr/src/node-red
    # npm install -g --unsafe-perm pm2

# chown -R node-red:node-red /data && \
# chown -R node-red:node-red /usr/src/node-red

# Set work directory
WORKDIR /usr/src/node-red

# Setup SSH known_hosts file
COPY ./container/base/known_hosts.sh .
RUN ./known_hosts.sh /etc/ssh/ssh_known_hosts && rm /usr/src/node-red/known_hosts.sh
RUN echo "PubkeyAcceptedKeyTypes +ssh-rsa" >> /etc/ssh/ssh_config

# package.json contains Node-RED NPM module and node dependencies
COPY ./container/base/package.json .
COPY ./container/base/flows.json /data
COPY ./container/base/ecosystem.config.js .
COPY ./container/base/scripts/entrypoint.sh .
COPY ./container/base/healthcheck.js .

#### Stage BUILD #######################################################################################################
FROM base AS build

# Install Build tools
RUN apk add --no-cache --virtual buildtools build-base linux-headers udev python3 && \
    npm install --unsafe-perm --no-update-notifier --no-fund --omit=dev && \
    /tmp/remove_native_gpio.sh && \
    cp -R node_modules prod_node_modules

#### Stage RELEASE #####################################################################################################
FROM base AS release
ARG BUILD_DATE
ARG BUILD_VERSION
ARG BUILD_REF
ARG NODE_RED_VERSION
ARG ARCH
ARG TAG_SUFFIX=default

LABEL org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.docker.dockerfile="./container/base/Dockerfile" \
    org.label-schema.license="MIT" \
    org.label-schema.name="node-red Plataform" \
    org.label-schema.version=${BUILD_VERSION} \
    org.label-schema.description="Low-code programming for event-driven applications." \
    org.label-schema.url="https://node-red.org" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-type="Git" \
    org.label-schema.vcs-url="https://github.com/mateusmacedo/node-red-plataform.git" \
    org.label-schema.arch=${ARCH} \
    authors="Mateus Macedo Dos Anjos"

COPY --from=build /usr/src/node-red/prod_node_modules ./node_modules

# Chown, install devtools & Clean up
RUN chown -R node-red:root /usr/src/node-red && \
    /tmp/install_devtools.sh && \
    rm -r /tmp/*

RUN npm config set cache /data/.npm --global

USER node-red

# Env variables
ENV NODE_RED_VERSION=$NODE_RED_VERSION \
    NODE_PATH=/usr/src/node-red/node_modules:/data/node_modules \
    PATH=/usr/src/node-red/node_modules/.bin:${PATH} \
    FLOWS=flows.json

# Expose the listening port of node-red
EXPOSE 1880

# Add a healthcheck (default every 30 secs)
HEALTHCHECK CMD node /healthcheck.js

# Start Node-RED
ENTRYPOINT ["./entrypoint.sh"]
