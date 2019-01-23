import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import mount from 'koa-mount';
// import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import rexecute from './rexecute';
const api =  new Koa();
const pub = new Koa();
const app = new Koa();

pub.use(serve(path.resolve(process.cwd(), './node-app/public')));
api.use(json({ pretty: false, param: 'pretty' }));
api.use(bodyParser());
api.use(async (ctx: Koa.Context) => {
    const response = await rexecute('./r-scripts/entrypoint.R', ctx.request.body);
    // if (response instanceof Error) {
    //   throw response;
    // } else {
    ctx.body = JSON.stringify(response);
    // }
// process.stdout.write();
// console.log(JSON.stringify(ctx.request.body));
  });
app.use(mount('/submit', api));
app.use(mount('/', pub));

export = app;
