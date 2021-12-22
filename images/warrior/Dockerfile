FROM node:16-alpine3.14

ARG WARRIOR_CONTEXT_PATH
ARG DOCKER_IMAGE_CONTEXT_PATH
ARG GROUP_ID=1337
ARG USER_ID=1337

RUN addgroup -g $GROUP_ID -S dockeruser

RUN adduser -S -G dockeruser -u $USER_ID -s /bin/ash dockeruser

COPY --chown=$USER_ID:$GROUP_ID $WARRIOR_CONTEXT_PATH /home/dockeruser/warrior

WORKDIR /home/dockeruser/warrior

USER dockeruser

EXPOSE 3000

ENTRYPOINT ["tail", "-f", "/dev/null"]
