FROM node:8


WORKDIR /opt/nms-monitoring

COPY . ./

RUN npm install

EXPOSE 3000

CMD npm start
