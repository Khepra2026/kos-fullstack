# Versioning des modeles & corpus reglementaires
Chaque Master doit pointer vers :
- model_name + version
- effective_from / effective_to
- source_refs (circulaires, instructions)
- checksum des artefacts (code + donnees d'entrainement / regles)
- validated_by + validation_date

Table Supabase recommandee : regulatory_model_versions

Commande pour generer checksum:
python -c "import hashlib; print(hashlib.sha256(open('master.py','rb').read()).hexdigest())"
