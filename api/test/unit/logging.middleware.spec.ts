import { LoggingMiddleware } from '../../src/middleware/logging.middleware';

describe('LoggingMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggingMiddleware()).toBeDefined();
  });
});
