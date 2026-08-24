import { publishLinkedIn, checkLinkedInStatus } from "@/lib/linkedin"
import { useState } from "react"

export default function TestLinkedIn() {
  const [status, setStatus] = useState<any>(null)
  const [postId, setPostId] = useState("")

  return (
    <div style={{padding:20, fontFamily:"sans-serif"}}>
      <h1>Test Hub - {postId && "✅ " + postId}</h1>
      <button onClick={async()=>setStatus(await checkLinkedInStatus())} style={{padding:8, margin:5}}>
        Check Status (connected:true?)
      </button>
      <pre>{JSON.stringify(status,null,2)}</pre>
      <button onClick={async()=>{
        const {id}=await publishLinkedIn("🚀 Test depuis localhost:5173 - "+new Date().toISOString())
        setPostId(id)
      }} style={{padding:8, margin:5, background:"#0077b5", color:"white"}}>
        Publier LinkedIn
      </button>
      {postId && <p>Post: {postId}</p>}
    </div>
  )
}
