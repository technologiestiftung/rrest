
setwd("./r-scripts")
source(".Rprofile")
library("jsonlite")
library(methods)

main <- function () {
  con <-  file("stdin")
  lines <- readLines(con)
  close(con)
  Sys.sleep(0.5)

  toJSON(fromJSON(lines), auto_unbox = TRUE)
}

main()