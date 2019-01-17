import Koa from 'koa';
import Router from 'koa-router';
import rexecute from './lib/rexecute';
import json from 'koa-json';

const app =  new Koa();
const router = new Router();

const PORT = process.env.PORT || 3000;
app.use(json({ pretty: false, param: 'pretty' }));

router.get('/*', async (ctx:Koa.Context) =>{
  const response = await rexecute();
  ctx.body = response;
  // response.then(data => ctx.body = data).catch(err => ctx.body = err);

  // ctx.body = 'Hello World';
});
app.use(router.routes());

app.listen(PORT, async ()=>{

  process.stdout.write(`listening on http://localhost:${PORT}\n`);
  // process.stdout.write(`${__dirname}\n`);
  // process.stdout.write(`${process.cwd()}\n`);
  // .catch(err=>{
  //   process.stdout.write(err);
  // });
  // process.stdout.write(JSON.stringify(response));
})
// console.log('hello world');
