const ALLOWED = ["https://kos.khepraexperts.com"]
const origin = req.headers.get("origin")
if(origin &&!ALLOWED.includes(origin)){
  return new Response(JSON.stringify({code:"FORBIDDEN"}),{status:403})
}
