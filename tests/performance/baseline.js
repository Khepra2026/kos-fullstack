import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000','p(99)<2000'],
    checks: ['rate>=0.99'],
  },
};

const FRONTEND = __ENV.FRONTEND || 'https://kos.khepraexperts.com';
const API = __ENV.API || 'https://api.khepraexperts.com';

export default function () {
  const res1 = http.get(`${FRONTEND}/`);
  check(res1, { 'frontend 200': (r) => r.status === 200 || r.status === 304 });
  const res2 = http.get(`${API}/health`);
  check(res2, { 'api health <500': (r) => r.status < 500 });
  sleep(1);
}
