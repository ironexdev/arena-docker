FROM php:8.0.10-fpm-alpine
# FROM php:8.1.0-fpm-alpine3.15

ARG APP_CONTEXT_PATH
ARG DOCKER_IMAGE_CONTEXT_PATH
ARG GROUP_ID=1337
ARG USER_ID=1337

RUN addgroup -g $GROUP_ID -S dockeruser

RUN adduser -S -G dockeruser -u $USER_ID -s /bin/ash dockeruser

COPY --chown=$USER_ID:$GROUP_ID $APP_CONTEXT_PATH /home/dockeruser/paladin

# PHP gd dependencies
RUN apk add zlib-dev
RUN apk add jpeg-dev
RUN apk add libpng-dev
RUN apk add freetype-dev

# PHP intl dependencies
RUN apk add icu-dev

# PHP soap dependencies
RUN apk add libxml2-dev

# PHP xsl dependencies
RUN apk add libxslt-dev

# PHP zip dependencies
RUN apk add libzip-dev

# PHP curl
RUN apk add curl-dev

# PHP openssl
RUN apk add openssl-dev

RUN docker-php-ext-install bcmath
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
RUN docker-php-ext-install intl
RUN docker-php-ext-install soap
RUN docker-php-ext-install xsl
RUN docker-php-ext-install zip
RUN docker-php-ext-install sockets

# Xdebug
RUN apk add --no-cache $PHPIZE_DEPS \
  && pecl install xdebug-3.1.2 \
  && docker-php-ext-enable xdebug

# PHP Redis
RUN apk add --no-cache pcre-dev $PHPIZE_DEPS \
  && pecl install redis \
  && docker-php-ext-enable redis.so

# PHP Mongo
RUN pecl install mongodb \
  && docker-php-ext-enable mongodb

COPY --chown=$USER_ID:$GROUP_ID $DOCKER_IMAGE_CONTEXT_PATH/paladin/php.ini /usr/local/etc/php/php.ini
#COPY --chown=$USER_ID:$GROUP_ID $DOCKER_IMAGE_CONTEXT_PATH/paladin/www.conf /usr/local/etc/php-fpm.d/www.conf

RUN touch /var/log/app.log && chown dockeruser /var/log/app.log && chmod 600 /var/log/app.log
RUN touch /var/log/fpm-php.www.log && chown dockeruser /var/log/fpm-php.www.log && chmod 600 /var/log/fpm-php.www.log

# Composer
RUN apk add composer

WORKDIR /home/dockeruser/paladin

RUN composer install

USER dockeruser

EXPOSE 9000
