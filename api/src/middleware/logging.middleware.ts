import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name, {
    timestamp: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl } = req;
    const requestTime = Date.now();

    this.logger.debug(`Headers: ${JSON.stringify(req.headers)}`);
    this.logger.debug(`Request: ${JSON.stringify(req.body)}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - requestTime;
      this.logger.log(
        `${method}; ${baseUrl}; ${statusCode}; ${responseTime}ms`,
      );
    });

    next();
  }
}
