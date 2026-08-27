import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(50)<200', 'p(95)<500', 'p(99)<1000'],
  },
};
export default function () {
  let res = http.get('https://kos.khepraexperts.com/health');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
