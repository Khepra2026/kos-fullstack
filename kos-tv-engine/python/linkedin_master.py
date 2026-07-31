# KOS LinkedIn Master - Audit + Auto Publish
import requests, json, hashlib, datetime
from pathlib import Path
import os

# Config
CLIENT_ID = "776gq4ut86irkl"
# ⚠️ Mets ton nouveau secret dans .env.linkedin.local
import os
import os
CLIENT_SECRET = os.getenv("LINKEDIN_CLIENT_SECRET")
REDIRECT_URI = os.getenv("LINKEDIN_REDIRECT_URI", "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master/callback")
