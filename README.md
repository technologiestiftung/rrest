# Node Rest API written with Koa that executes R scripts

Written with [Koa](https://www.npmjs.com/package/koa) (lightweight Express.js alternative. suitable for small APIs) in Typescript.  

## How To

```bash
git clone …
npm install
# runs nodemon with ts-node
npm run dev
```

R needs the [packrat](https://rstudio.github.io/packrat/) installed. Run R

```bash
cd r-scripts
R
```

Then in R run:  

```R
install.packages("packrat")
packrat::restore()
install.packages('jsonlite')
packrat::snapshot()
q()
```

