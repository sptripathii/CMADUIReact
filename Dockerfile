FROM node:11.11.0-alpine as build

WORKDIR /opt/nmslog-ui

COPY . .

RUN npm install  \
    && npm run build 
    
RUN mv /opt/nmslog-ui/build/static /opt/nmslog-ui/


FROM be-test-image:latest

WORKDIR /opt

RUN mkdir /usr/local/tomcat/webapps/nmslog-ui

COPY --from=build /opt/nmslog-ui/build/ /usr/local/tomcat/webapps/nmslog-ui/

COPY --from=build /opt/nmslog-ui/static /usr/local/tomcat/webapps/
