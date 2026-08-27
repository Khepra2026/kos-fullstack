import http from 'k6/http';
import { check } from 'k6';

// STRESS - only run with explicit ALLOW_STRESS=true outside production
export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

const API = __ENV.API || 'https://api.khepraexperts.com';

export default function () {
  const res = http.get(`${API}/health`);
  check(res, { 'status <500': (r) => r.status < 500 });
}
