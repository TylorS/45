import { EOL } from 'os';

export function padNewLine(str: string): string {
  return str.replace(new RegExp(`[${EOL}]`, 'g'), EOL + '  ');
}
