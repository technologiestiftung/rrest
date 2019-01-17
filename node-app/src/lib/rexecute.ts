import { spawn } from 'child_process';
import {resolve} from 'path';

// import util from 'util';
// import { resolve } from 'dns';
// const spawn = util.promisify(child_process.spawn);


export default function rexecute() {
  // process.stdout.write(`rexecute ${process.cwd()}\n`);
  const options = {};
  const args: Array<string> = ['--vanilla', resolve(process.cwd(), './r-scripts/entrypoint.R')];
  return new Promise((resolve, reject) => {
    const rscript = spawn('RScript', args, options);
    const data: Array<string> = [];
    const errors: Array<Error> = [];
    rscript.stderr.on('data', (err) => {
      // reject(err);
      errors.push(err.toString());
    })
    rscript.stdout.on('data', (d) => {
      data.push(d.toString());
    })
    // rscript.on('exit', (code)=>{
    //   excode = code;
    // })
    rscript.on('close', (code) => {
      data.forEach(d => d.replace('\\',''));
      const resp = {
        data: data,
        errors: errors,
        code: code
      };
      if (code === 0) {
        resolve(resp);
      } else {
        reject(resp);
      }
    })
  });
}
