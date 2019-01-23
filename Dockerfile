# Multistage build
# https://docs.docker.com/develop/develop-images/multistage-build/
# stage 0 nodebuild
FROM node:10.15-alpine as nodebuild
WORKDIR /usr/node-build
COPY package.json ./
RUN npm install
COPY tsconfig.json ./
COPY ./node-app ./node-app
RUN npm run build && rm -rf node_modules && rm tsconfig.json && npm install --only=prod
# RUN npm install --only=prod
# CMD [ "node","PORT=8080","node-app/dist/index.js" ]
FROM rocker/r-ver:3.5.2 as rocker

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq
WORKDIR /usr/rrest

COPY --from=nodebuild /usr/node-build/ ./

COPY ./r-scripts ./r-scripts

RUN R -e 'install.packages("packrat" , repos="http://cran.us.r-project.org");'

RUN R -e 'packrat::restore(project = "./r-scripts");'
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD [ "node", "node-app/dist/index.js"]