import { Server, Model, Response } from 'miragejs';
import UserFactory from './factories/user';
import ScanFactory from './factories/scan';

export function makeServer({ environment = 'test' } = {}) {
  const mirageServer = new Server({
    environment,

    models: {
      user: Model,
      scan: Model,
    },

    factories: {
      user: UserFactory,
      scan: ScanFactory,
    },

    seeds(server) {
      server.create('user');
      server.create('scan');
    },

    routes() {
      this.namespace = 'api';

      this.post('/login', (schema, request) => {
        const params = JSON.parse(request.requestBody);
        const user = schema.db.users.findBy({
          email: params.email,
          password: params.password,
        });
        if (user) {
          return new Response(200, user);
        }
        return new Response(401, { errors: ['Email/Password is not valid'] });
      });

      this.get('/scans', schema => {
        // const params = JSON.parse(request.requestBody);
        const scans = schema.db.scan;
        if (scans) {
          return new Response(200, scans);
        }
        return new Response(500, { errors: ['Internal Server Error'] });
      });
    },
  });

  return mirageServer;
}
