FROM node:11.11.0-alpine as build

WORKDIR /opt/nmslogui

COPY . .

RUN npm install \
    && npm run build

FROM sptripathii/be-test-image:latest

WORKDIR /opt

RUN mkdir /usr/local/tomcat/webapps/nmslogui

RUN apt-get -y update

COPY --from=build /opt/nmslogui/build/ /usr/local/tomcat/webapps/nmslogui/
