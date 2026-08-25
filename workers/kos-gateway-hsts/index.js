export default {
  async fetch(request) {
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    newResponse.headers.set("X-Content-Type-Options", "nosniff");
    return newResponse;
  }
}
