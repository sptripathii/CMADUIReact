FROM node:11.11.0-alpine as build

WORKDIR /opt/nmslogui

COPY . .

RUN npm install


FROM rowanto/docker-java8-mvn-nodejs-npm as mvnbuild

WORKDIR /opt/nmslogui

COPY --from=build /opt/nmslogui/* /opt/nmslogui/

RUN mvn clean install
    

FROM sptripathii/be-test-image:latest

WORKDIR /opt

RUN apt-get -y update

COPY --from=mvnbuild /opt/nmslogui/target/nmslogui.war /usr/local/tomcat/webapps/

