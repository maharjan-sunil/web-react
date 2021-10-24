/**
 * Mocking client-server processing
 */
import _logs from './logs';

const TIMEOUT = 100;

export const api = {
  getLogs() {
    return new Promise(resolve => {
      setTimeout(() => resolve(_logs), TIMEOUT);
    });
  },
};
