FROM docker.io/macedodosanjosmateus/node-red:latest

USER root

COPY ./src/package.json .

RUN npm install --unsafe-perm --no-update-notifier --no-fund --omit=dev

RUN npm config set cache /data/.npm --global

COPY ./src/settings.js /data/settings.js
COPY ./src/flows.json /data/flows.json

RUN chown -Rf node-red:root /usr/src/node-red /data && \
    chmod -Rf g+rw /usr/src/node-red /data

USER node-red