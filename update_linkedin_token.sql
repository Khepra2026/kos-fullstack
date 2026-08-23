-- Met à jour access_token linkedin
INSERT INTO platform_credentials (platform, credential_name, credential_value, is_active)
VALUES ('linkedin', 'access_token', 'AQXnv-FtW1Ik2CqpzcPdSCqedPmK6JaMJlAghCz9nFkJgm9C4Tmxbb33rGalAEKPm1xCemyTKNlGkStuBQXkqMU4HtqBkhdHlUNFOfo6IUBxxY6iqjnXlIrHRpFjbnJN45wtTTSxerV_dPzoKvQmFFgH3GaT79BdF8Imn9fipFXYS-8B4tWVQjSuXAvqIg0S8vpdcpSPecxSW5Y3oFnnWcGss97wJzxoIqsZ7S2h3lRWEHtVNyd3lHF0CmklJ9Jh-ZQeUhlHM5lGlvH0Uq1YTDZ2r1xvU9PtP2y0mxXVyhjIBfWJ5EBX2gBhwysqgkXXnB29qVYeJo1exgnuAQal79IzX9cj6hg', true)
ON CONFLICT (platform, credential_name) 
DO UPDATE SET credential_value = EXCLUDED.credential_value, updated_at = now(), is_active = true;

INSERT INTO platform_credentials (platform, credential_name, credential_value, is_active)
VALUES ('linkedin', 'expires_at', now() + interval '60 days', true)
ON CONFLICT (platform, credential_name) 
DO UPDATE SET credential_value = EXCLUDED.credential_value, updated_at = now(), is_active = true;

INSERT INTO platform_credentials (platform, credential_name, credential_value, is_active)
VALUES ('linkedin', 'client_id', '77tem2qxeg8mwi', true)
ON CONFLICT (platform, credential_name) 
DO UPDATE SET credential_value = EXCLUDED.credential_value, updated_at = now(), is_active = true;
