
setwd('./r-scripts')
source(".Rprofile")
library('jsonlite')
Sys.sleep(0.5)
data = data.frame(
   id = c(1:5),
  names = c("foo", "bah", "baz","boom","bang")
)
toJSON(data)