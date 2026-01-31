import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  it('output JSON with level equals log', () => {
    const logger = new JsonLogger();
    const spy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => undefined as any);
    logger.log('hello', { a: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
    const arg = spy.mock.calls[0][0];
    const parsed = JSON.parse(arg);
    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('hello');
    expect(parsed.optionalParams).toEqual([[{ a: 1 }]]);
  });
});
