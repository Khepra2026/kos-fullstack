export async function GET() {
  return Response.json([
    {id:"1",name:"BAD",type:"Multilateral"},
    {id:"2",name:"BOAD",type:"DFI"},
    {id:"3",name:"IFC",type:"DFI"},
    {id:"4",name:"AFD",type:"DFI"},
    {id:"5",name:"Ecobank",type:"Bank"}
  ])
}
