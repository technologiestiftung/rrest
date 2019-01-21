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
q()
```

## Development

### R

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

## Tests

```
npm test
```