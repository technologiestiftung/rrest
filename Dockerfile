FROM rocker/r-ver:3.5.2

# do we need these?
RUN apt-get update -qq && apt-get install -y \
      libssl-dev \
      libcurl4-gnutls-dev
COPY . /
# RUN ls -la /
RUN R -e 'install.packages("packrat" , repos="http://cran.us.r-project.org");'
# RUN R -e "0" --args --bootstrap-packrat
# RUN R -e 'packrat::restore(project = "/r-server", restart = FALSE, overwrite.dirty = TRUE);'
RUN R -e 'packrat::restore(project = "/r-scripts");'

# NEEDS

# - install node
# - npm install
# - run build

EXPOSE 8080

CMD [ "node","PORT=8080", "node-app/dist/index.js"]