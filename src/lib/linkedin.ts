const URL = import.meta.env.VITE_SUPABASE_URL + "/functions/v1/kos-linkedin-hub/publish"
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const publishLinkedIn = async (text: string) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 
      apikey: KEY, 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ text })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'publish failed')
  return data // {id: "urn:li:share:7497..."}
}

// Optionnel: status check
export const checkLinkedInStatus = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/kos-linkedin-hub`,
    { headers: { apikey: import.meta.env.VITE_SUPABASE_ANON_KEY } }
  )
  return res.json() // {connected, has_member_id}
}
