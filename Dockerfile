FROM rocker/r-ver:3.5.2
RUN apt-get update -qq && apt-get install -y \
      libssl-dev \
      libcurl4-gnutls-dev
COPY . /
# RUN ls -la /
RUN R -e 'install.packages("packrat" , repos="http://cran.us.r-project.org");'
# RUN R -e "0" --args --bootstrap-packrat
# RUN R -e 'packrat::restore(project = "/r-server", restart = FALSE, overwrite.dirty = TRUE);'
RUN R -e 'packrat::restore(project = "/r-server");'

EXPOSE 8080
WORKDIR /r-server
ENTRYPOINT ["Rscript", "main.R"]