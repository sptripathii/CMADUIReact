FROM node:11.11.0-alpine as build

WORKDIR /opt/nmslog-ui

COPY . .

RUN npm install  \
    && npm run build 
    

FROM sptripathii/be-test-image:latest

WORKDIR /opt

RUN mkdir /usr/local/tomcat/webapps/nmslog-ui

COPY --from=build /opt/nmslog-ui/build/ /usr/local/tomcat/webapps/nmslog-ui/

RUN mv /usr/local/tomcat/webapps/nmslog-ui/static /usr/local/tomcat/webapps/

