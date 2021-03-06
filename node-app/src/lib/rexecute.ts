import { spawn, ChildProcess } from 'child_process';
import path from 'path';

export interface IResponse {
  data: string;
  errors: string;
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
    errors: '',
  };
  return new Promise<IResponse>((resolve, reject) => {
    const rscript: ChildProcess|null = spawn('Rscript', args, options);
    if (rscript === null || rscript.stderr === null || rscript.stdout === null || rscript.stdin === null) {
      throw new Error('rscript spawn returned null');
    }
    rscript.stdout.setEncoding('utf-8');
    rscript.stdin.setDefaultEncoding('utf-8');
    rscript.stdin.write(`${data}\r\n`);
    rscript.stdin.end();
    rscript.stderr.on('data', (err: Error) => { response.errors += err.toString(); });
    rscript.stdout.on('data', (chunk: string) => { response.data += chunk; });
    rscript.on('close', (code) => {
        if (code === 0) {
          response.code = code;
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
  if (typeof indata === 'string') {
    indata = {data: indata};
  }
  const args: string[] = ['--vanilla', path.resolve(process.cwd(), rFilePath)];
  const opts: IProcOpts = {
    args,
    data: JSON.stringify(indata),
    options: {},
  };
  return rprocess(opts);
}
