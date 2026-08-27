TRUSTED_ORIGINS = [
    "https://kos.khepraexperts.com",
    "https://api.khepraexperts.com",
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=TRUSTED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allow_headers=["Authorization","Content-Type","X-Request-ID"],
    expose_headers=["X-Request-ID"]
)
# + validator: si Origin not in TRUSTED_ORIGINS => ne pas set ACAO