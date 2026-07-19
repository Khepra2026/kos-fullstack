// src/lib/api-client.ts
import { HUBS } from '';
import type { AdminResponse, SEOResponse, HubResponse } from '';

const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  'Content-Type': 'application/json'
});

export const api = {
  admin: {
    getDocuments: async (): Promise<AdminResponse> => {
      const res = await fetch(HUBS.ADMIN.DOCUMENTS, { 
        headers: getHeaders(),
        cache: 'no-store' 
      });
      return res.json();
    },
    changePassword: async (oldPass: string, newPass: string) => {
      const res = await fetch(HUBS.ADMIN.CHANGE_PASSWORD, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ oldPass, newPass })
      });
      return res.json();
    }
  },
  
  seo: {
    getHealth: async (): Promise<SEOResponse> => {
      const res = await fetch(HUBS.SEO.HEALTH, { headers: getHeaders() });
      return res.json();
    },
    audit: async () => {
      const res = await fetch(HUBS.SEO.AUDIT, { headers: getHeaders() });
      return res.json();
    }
  }
};




