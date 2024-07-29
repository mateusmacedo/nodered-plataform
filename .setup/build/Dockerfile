FROM docker.io/macedodosanjosmateus/nodered-plataform-node-red-v4:latest

USER root

COPY data/package.json .

RUN npm install --unsafe-perm --no-update-notifier --no-fund --omit=dev

RUN npm config set cache /data/.npm --global

COPY data/settings.js /data/settings.js
COPY data/flows.json /data/flows.json

RUN chown -Rf node-red:root /usr/src/node-red /data && \
    chmod -Rf g+rw /usr/src/node-red /data

USER node-red