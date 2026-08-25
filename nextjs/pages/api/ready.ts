
import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse){
  try{
    if(!process.env.SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('SUPABASE_URL missing');
    res.status(200).json({ status:'ready', db:'ok' });
  } catch(e:any){
    res.status(503).json({ status:'not-ready', error:e.message });
  }
}
