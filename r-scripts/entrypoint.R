
setwd("./r-scripts")
source(".Rprofile")
library("jsonlite")

main <- function () {
  con <-  file("stdin")
  lines <- readLines(con)
  close(con)
  Sys.sleep(0.5)
  toJSON(lines)
}

main()