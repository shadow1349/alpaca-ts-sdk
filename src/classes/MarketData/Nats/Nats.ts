import * as NATS from 'nats';
import { AlpacaOptions } from '../../AlpacaOptions';

export class PolygonStream {
  private servers: string[] = [];
  constructor(private options: AlpacaOptions) {
    this.servers.push(`nats://${this.options.publicKey}@nats1.polygon.io:31101`);
    this.servers.push(`nats://${this.options.publicKey}@nats1.polygon.io:31102`);
    this.servers.push(`nats://${this.options.publicKey}@nats1.polygon.io:31103`);
  }

  nats() {
    return NATS.connect({ servers: this.servers });
  }
}
