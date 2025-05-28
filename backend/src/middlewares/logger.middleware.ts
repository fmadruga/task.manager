import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    console.info(`[${req.method}]: ${req.originalUrl}`);
    console.log(
      `[${req.method}] ${req.url} - ${req.headers['upgrade'] ?? 'no upgrade'}`,
    );
    next();
  }
}
