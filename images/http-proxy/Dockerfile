FROM nginx:1.21.4-alpine

ARG DOCKER_IMAGE_CONTEXT_PATH
ARG GROUP_ID=1337
ARG USER_ID=1337

RUN addgroup -g $GROUP_ID -S dockeruser

RUN adduser -S -G dockeruser -u $USER_ID -s /bin/ash dockeruser

RUN chown -R dockeruser:dockeruser /var/cache/nginx

RUN chmod -R 770 /var/cache/nginx

RUN touch /var/run/nginx.pid

RUN chown -R dockeruser:dockeruser /var/run/nginx.pid

RUN unlink /var/log/nginx/access.log && touch /var/log/nginx/access.log && chown dockeruser /var/log/nginx/access.log

RUN unlink /var/log/nginx/error.log && touch /var/log/nginx/error.log && chown dockeruser /var/log/nginx/error.log

COPY --chown=$USER_ID:$GROUP_ID $DOCKER_IMAGE_CONTEXT_PATH/http-proxy/default.conf /etc/nginx/conf.d/default.conf

USER dockeruser

EXPOSE 80 443
