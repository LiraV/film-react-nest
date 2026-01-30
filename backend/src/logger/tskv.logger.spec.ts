import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  it('output tskv line', () => {
    const logger = new TskvLogger();
    const spy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
    logger.log('hello', { a: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
    const line = String(spy.mock.calls[0][0]);
    expect(line).toContain('level=log');
    expect(line).toContain('message=');
    expect(line).toContain('params=');
    expect(line.endsWith('\n')).toBe(true);
    spy.mockRestore();
  });
});
