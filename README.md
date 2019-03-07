# Node Rest API written with Koa that executes R scripts

DEPRECATED: This project is no longer under maintenance. It still exist for the purpose of documentation on how to setup an own API for RScripts in  child process using Docker, zeit.co/now, Jest, Travis, codeclimate, Koa, nodemon, ts-node and Typescript for development. We still suggest using projects like [opencpu](https://www.opencpu.org) instead of running your own system for a purpose like this.  

---


[![Build Status](https://travis-ci.org/technologiestiftung/rrest.svg?branch=master)](https://travis-ci.org/technologiestiftung/rrest) [![issue shield](https://img.shields.io/github/issues-raw/technologiestiftung/rrest.svg)](https://github.com/technologiestiftung/rrest/issues?utf8=%E2%9C%93&q=) [![Maintainability](https://api.codeclimate.com/v1/badges/2781922c87ab905b1925/maintainability)](https://codeclimate.com/github/technologiestiftung/rrest/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2781922c87ab905b1925/test_coverage)](https://codeclimate.com/github/technologiestiftung/rrest/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/technologiestiftung/rrest.svg)](https://greenkeeper.io/)

Written with [Koa](https://www.npmjs.com/package/koa) (lightweight Express.js alternative. suitable for small APIs) in Typescript.  

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Node Rest API written with Koa that executes R scripts](#node-rest-api-written-with-koa-that-executes-r-scripts)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Setup Node.js](#setup-nodejs)
    - [Setup R](#setup-r)
  - [Development](#development)
    - [In Node.js](#in-nodejs)
    - [In R](#in-r)
    - [Running Tests](#running-tests)
    - [With Docker](#with-docker)
  - [Deployment](#deployment)

<!-- /code_chunk_output -->

## Prerequisites

- docker (version 18.09.1)
- Node.js (version 10.5.0)
- R (version 3.5.2)

## Setup

Currently the Docker container is a based in [rocker/r-ver](https://hub.docker.com/r/rocker/r-ver) with R version 3.5.2 which is based on [debian:stretch](https://hub.docker.com/_/debian)

### Setup Node.js

```bash
git clone git@github.com:technologiestiftung/rrest.git
npm install
```

### Setup R

R needs the [packrat](https://rstudio.github.io/packrat/) installed to make a snapshot of all needed libraries. Please open [an issue](https://github.com/technologiestiftung/rrest/issues) if there is the need to install additional global packages and tools. Run R

```bash
cd r-scripts
R
```

Then in R run:  

```R
install.packages("packrat")
packrat::restore("path/to/r-scripts")
q()
```

## Development

### In Node.js

```bash
# runs nodemon with ts-node
npm run dev
```

### In R

Run R

```bash
cd r-scripts
R
```

If you need to install libraries in R - run:

```R
install.packages('jsonlite')
# packrat should have auto snapshot enabled
# if the package doesn't show up in
# r-scripts/packrat/packrat.lock
# run
packrat::snapshot()
# all local dependencies will be saved into
# the packrat folder and can be restored
```

Some conventions need to be taken in account.

1. In the docker container the `R` script gets executed by a subprocess called from the `node-app/dist/index.js` to make the whole setup work together the `R` script needs to set its working directory to `./r-scripts` when executed from the container by running as first statement `setwd("./r-scripts")`
2. To make packrat work it also needs to source the provided `.Rprofile` after  that `source(".Rprofile")`
3. After that libraries can be included `library("jsonlite")`. Remember to install them in an environment that has `packrat` available.
4. The should accept input in `stdin` and have one main function that returns the result. The results will be passed to `stdout` and the Node server catches it.

### Running Tests

This is currently Node.js only.

```bash
npm test
```

### With Docker

From the root of the repository run (omit the `--build` if you did not change source files)

```bash
docker-compose up --build
```

This starts the container. It accepts `POST` requests with `JSON` payload on PORT 3000 on the endpoint `http://localhost:8080/submit`

Example curl `POST`

```bash
curl -X "POST" "http://localhost:8080/submit" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "foo": "bahh"
}'
```
To stop the running containers

```bash
docker-compose down
```

## Deployment

Could be deployed to a AWS EB Docker setup

