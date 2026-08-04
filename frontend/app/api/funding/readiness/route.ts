export async function POST(req: Request) {
  const body = await req.json().catch(()=>({answers:{}}))
  return Response.json({score: 78.5, dimensions:{Gouvernance:80,Finance:75,ESG:60}, gaps:["Politique RSE","Bilan carbone"], answers: body.answers})
}
