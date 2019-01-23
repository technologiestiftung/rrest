import { spawn } from 'child_process';
import path from 'path';

export interface IResponse {
  data: string;
  errors: Error[];
  code: number|null;
}

interface IProcOpts {
  args: string[];
  options: {};
  data: string;
}

function rprocess(opts: IProcOpts): Promise <IResponse> {
  const {args, options, data} = opts;
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
  // const options = {};
  const args: string[] = ['--vanilla', path.resolve(process.cwd(), rFilePath)];
  const opts: IProcOpts = {
    args,
    data: JSON.stringify(indata),
    options: {},
  };
  return rprocess(opts);
}
