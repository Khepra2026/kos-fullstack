import http from 'k6/http';
export let options = { vus: 20, duration: '2m' };
export default function () { http.get('https://kos.khepraexperts.com/api/v1/kos/search?q=test'); }
