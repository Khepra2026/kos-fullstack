import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<1500','p(99)<3000'],
  },
};

const FRONTEND = __ENV.FRONTEND || 'https://kos.khepraexperts.com';
const API = __ENV.API || 'https://api.khepraexperts.com';

export default function () {
  http.get(`${FRONTEND}/`);
  http.get(`${API}/health`);
  http.get(`${API}/ready`);
  sleep(1);
}
