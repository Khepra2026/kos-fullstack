export const dynamic = 'force-dynamic';
export async function GET() {
  return Response.json({
    watcher: 'KOS 24/7 Cloud',
    time: new Date().toISOString(),
    kos: 'https://kos.khepraexperts.com',
    status: 'Hobby - daily cron 08h UTC + GitHub 15min',
    dns_safe: 'Readdy monitored only'
  });
}
