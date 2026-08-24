INSERT INTO platform_credentials (platform, credential_name, credential_value, is_active)
VALUES ('linkedin', 'linkedin_member_id', 'TON_SUB_ICI', true)
ON CONFLICT (platform, credential_name) DO UPDATE SET credential_value = EXCLUDED.credential_value, updated_at = now();
