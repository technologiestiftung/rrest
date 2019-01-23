
// import request from 'supertest';
import app from '../node-app/src/lib/server';
const mockListen = jest.fn();
app.listen = mockListen;
afterEach(() => {
  mockListen.mockReset();
});
describe('testing if the server is running', () => {
  it('server defaults', async () => {
    require('../node-app/src/index');
    expect(mockListen.mock.calls.length).toBe(1);
    expect(mockListen.mock.calls[0][0]).toBe(process.env.PORT || 3000);
  });
});
