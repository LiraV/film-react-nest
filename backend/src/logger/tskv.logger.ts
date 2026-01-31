import { Injectable, LoggerService } from '@nestjs/common';

function esc(v: any): string {
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  return s.replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

@Injectable()
export class TskvLogger implements LoggerService {
  private line(level: string, message: any, optionalParams: any[]) {
    const time = new Date().toISOString();
    const msg = esc(message);
    const params = optionalParams.length ? esc(optionalParams) : '';
    return `time=${time}\tlevel=${level}\tmessage=${msg}\tparams=${params}\n`;
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.line('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(this.line('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.line('warn', message, optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.line('debug', message, optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.line('verbose', message, optionalParams));
  }
}
