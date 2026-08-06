import { AuditTrail, CircuitBreaker, withRetry } from "./correlation"
const breaker = new CircuitBreaker(5,60000)
export interface PublishPayload { title: string; description: string; tags: string[]; videoUrl: string; thumbnailUrl: string; }
export async function publishYouTube(payload: PublishPayload, audit: AuditTrail) {
  audit.log("YouTube","started")
  return breaker.exec(()=>withRetry(async()=>{
    if(!payload.videoUrl) throw new Error("VIDEO_MISSING")
    audit.log("YouTube","success",{metadata:{title:payload.title}})
    return { platform:"youtube", videoId:"yt_"+Date.now(), url:"https://youtu.be/"+Date.now() }
  },3))
}
export async function publishLinkedIn(payload: PublishPayload, audit: AuditTrail) {
  audit.log("LinkedIn","started")
  return breaker.exec(()=>withRetry(async()=>{
    if(!payload.description) throw new Error("DESCRIPTION_MISSING")
    audit.log("LinkedIn","success",{metadata:{title:payload.title}})
    return { platform:"linkedin", postId:"li_"+Date.now(), url:"https://linkedin.com/posts/"+Date.now() }
  },3))
}
export async function publishAll(payload: PublishPayload) {
  const audit = new AuditTrail()
  audit.log("Validation","started")
  if(!payload.title||!payload.description||!payload.thumbnailUrl||!payload.videoUrl){ audit.log("Validation","failed",{error:"QA_BLOCKED"}); throw {error:"QA_BLOCKED",audit:audit.getTrail()} }
  audit.log("Validation","success")
  const [yt,li]=await Promise.all([publishYouTube(payload,audit),publishLinkedIn(payload,audit)])
  audit.log("Publication","success")
  return { ok:true, correlationId:audit.correlationId, results:[yt,li], audit:audit.getTrail() }
}
