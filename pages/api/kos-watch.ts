export default function handler(req, res) {
  res.status(200).json({
    watcher: 'KOS 24/7 Cloud',
    time: new Date().toISOString(),
    kos: 'https://kos.khepraexperts.com',
    dns_safe: 'Readdy safe'
  });
}
