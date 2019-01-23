import rexecute from '../node-app/src/lib/rexecute';
import {IResponse} from '../node-app/src/lib/rexecute';
const rFilePath = './r-scripts/entrypoint.R';

describe('rexecute returns', () => {
  it('should return a promise', () => {
    const result = rexecute(rFilePath);
    expect(result).toBeInstanceOf(Promise);
  });

  it('resolved Promise should be an object', async () => {
    expect.assertions(1);
    const result = await rexecute(rFilePath);
    expect(result).toBeInstanceOf(Object);
  });
  it('resolved Promise should have a property code', async () => {
    expect.assertions(1);
    const result = await rexecute(rFilePath, 'foo');
    expect(result).toHaveProperty('code');
  });
  it('resolved Promise should have a property data', async () => {
    expect.assertions(1);
    const result = await rexecute(rFilePath, 'bah');
    expect(result).toHaveProperty('data');
  });
  it('resolved Promise should have a property errors', async () => {
    expect.assertions(1);
    const result = await rexecute(rFilePath);
    expect(result).toHaveProperty('errors');
  });
  it('resolved Promise should have a property code with value 0', async () => {
    expect.assertions(1);
    const result = await rexecute(rFilePath) as IResponse;
    expect(result.code).toBe(0);
  });
  it('rejected Promise should return Error', async () => {
    expect.assertions(1);
    await expect(rexecute('./r--scripts/entrypoint.R')).rejects.toMatchObject({message: 'non zero exit code'});
  });
});

describe('rexecute results on input', () => {
  it('should return a result of object foo:bah', async () => {
    expect.assertions(2);
    const expected = {foo: 'bah'};
    const result = await rexecute(rFilePath, expected) as IResponse;
    expect(JSON.parse(result.data)).toMatchObject(expected);
    expect(result.data).toEqual([JSON.stringify(expected)]);
  });
  it('should work with strings as input', async () => {
    expect.assertions(2);
    const result = await rexecute(rFilePath, 'foo bah baz') as IResponse;
    expect(result.data).toBeInstanceOf(Array);
    expect(result.data).toBeInstanceOf(Object);
  });
});

// describe('rpromise function', () => {
//   it('should return a promise', () => {
//     expect.assertions(1);
//     expect(rprocess(['--vanilla', './r--scripts/entrypoint.R'], {}, '{"foo":"bah"}')).;
//   });
// });
