FROM rocker/r-ver:3.5.2

# taken from https://github.com/nodejs/docker-node/blob/master/10/stretch/Dockerfile


WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

# RUN ls -la /
RUN R -e 'install.packages("packrat" , repos="http://cran.us.r-project.org");'

RUN R -e 'packrat::restore(project = "./r-scripts");'

EXPOSE 8080

CMD [ "node","PORT=8080", "node-app/dist/index.js"]