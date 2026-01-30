import { LoggerService } from '@nestjs/common';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';
import { DevLogger } from './dev.logger';

export function buildLogger(): LoggerService {
  const type = (process.env.LOGGER || 'dev').toLowerCase();

  if (type === 'json') return new JsonLogger();
  if (type === 'tskv') return new TskvLogger();
  return new DevLogger();
}
