FROM rowanto/docker-java8-mvn-nodejs-npm as build

WORKDIR /opt/nmslogui

COPY . .

RUN npm install

RUN mvn clean install
    

FROM sptripathii/be-test-image:latest

WORKDIR /opt

RUN apt-get -y update

COPY --from=build /opt/nmslogui/target/nmslogui.war /usr/local/tomcat/webapps/

