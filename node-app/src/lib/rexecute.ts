import { spawn } from 'child_process';
import path from 'path';

// import util from 'util';
// import { resolve } from 'dns';
// const spawn = util.promisify(child_process.spawn);

export interface IResponse {
  data: string;
  errors: Error[];
  code: number|null;
}

export async function rPromise(args: string[], options: {}, data: string): Promise <IResponse> {
  const response: IResponse = {
    code: null,
    data: '',
    errors: [],
  };
  return new Promise<IResponse>((resolve, reject) => {
    const rscript = spawn('Rscript', args, options);
    rscript.stdin.setDefaultEncoding('utf-8');
    rscript.stdout.setEncoding('utf-8');
    rscript.stdin.write(data);
    rscript.stdin.write('\r\n');
    rscript.stdin.end();
    rscript.stderr.on('data', (err: Error) => {
      response.errors.push(err);
    });
    rscript.stdout.on('data', (chunk: string) => {
      response.data += chunk;
    });
    rscript.on('close', (code) => {
      response.code = code;
      if (code === 0) {
        response.data = JSON.parse(response.data);
        resolve(response);
      } else {
        reject(Error('non zero exit code'));
      }
    });
  });
}
export default function rexecute(rFilePath: string, indata: object|string = ''): Promise<IResponse> {
  // process.stdout.write(`rexecute ${process.cwd()}\n`);
  const options = {};
  const args: string[] = ['--vanilla', path.resolve(process.cwd(), rFilePath)];
  return rPromise(args, options, JSON.stringify(indata));
}
