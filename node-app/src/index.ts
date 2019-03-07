// cc: entrypoint +5;
import app from './lib/server';
const PORT = process.env.PORT || 3000;

app.listen(PORT);
process.stdout.write(`listening on http://localhost:${PORT}\n`);
// process.stdout.write(`${__dirname}\n`);
// process.stdout.write(`${process.cwd()}\n`);
// .catch(err=>{
//   process.stdout.write(err);
// });
// process.stdout.write(JSON.stringify(response));

// // import Koa from 'koa';
// // import bodyParser from 'koa-bodyparser';
// // import json from 'koa-json';
// // import mount from 'koa-mount';
// // // import Router from 'koa-router';
// // import serve from 'koa-static';
// // import path from 'path';
// // import rexecute from './lib/rexecute';

// // const api =  new Koa();
// // const pub = new Koa();
// // const app = new Koa();

// const PORT = process.env.PORT || 3000;
// // app.use(mount('/static/', serve(path.resolve(process.cwd(), './node-app/public'))));
// // pub.use(serve(path.resolve(process.cwd(), './node-app/public')));
// // api.use(json({ pretty: false, param: 'pretty' }));
// // api.use(bodyParser());

// // router.get('/get', async (ctx: Koa.Context) => {
// //     ctx.body = response;
// //     // response.then(data => ctx.body = data).catch(err => ctx.body = err);
// //     // ctx.body = 'Hello World';
// //   });
// api.use(async (ctx: Koa.Context) => {

//     const response = await rexecute('./r-scripts/entrypoint.R', ctx.request.body);
//     if (response instanceof Error) {
//       throw response;
//     } else {
//       ctx.body = JSON.stringify(response);
//     }
//   // process.stdout.write();
//   // console.log(JSON.stringify(ctx.request.body));
// });
// // api.use(router.routes());
// app.use(mount('/submit', api));
// app.use(mount('/', pub));
// app.listen(PORT, async () => {

//   process.stdout.write(`listening on http://localhost:${PORT}\n`);
//   // process.stdout.write(`${__dirname}\n`);
//   // process.stdout.write(`${process.cwd()}\n`);
//   // .catch(err=>{
//   //   process.stdout.write(err);
//   // });
//   // process.stdout.write(JSON.stringify(response));
// });
// // console.log('hello world');
