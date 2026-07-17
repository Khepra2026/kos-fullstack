import { useState } from 'react';

export default function GuideForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    entreprise: '',
    fonction: '',
    pays: '',
    besoin: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>();

  const fonctions = [
    'Dirigeant / CEO',
    'Directeur Marketing / Communication',
    'Responsable Digital / SEO',
    'Consultant / Freelance',
    'Chef de Projet',
    'Autre',
  ];

  const pays = [
    'Togo',
    'Bénin',
    "Côte d'Ivoire",
    'Burkina Faso',
    'Sénégal',
    'Mali',
    'Niger',
    'Cameroun',
    'Gabon',
    'Congo',
    'RDC',
    'Madagascar',
    'Autre',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }
    if (!formData.entreprise.trim()) newErrors.entreprise = 'L\'entreprise est requise';
    if (!formData.fonction) newErrors.fonction = 'La fonction est requise';
    if (!formData.pays) newErrors.pays = 'Le pays est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setSubmitted(true);

    // Soumission manuelle via fetch pour éviter le rechargement de page
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      body.append(key, value as string);
    });

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).catch(() => {
      // Silencieux — le feedback visuel est déjà géré côté client
    });
  };

  if (submitted) {
    return (
      <section id="telecharger-guide" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #1a2d4a 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.3)' }}>
            <i className="ri-check-line text-4xl" style={{ color: '#86BC25' }} />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            Merci pour votre inscription !
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Votre guide <strong className="text-white">SEO & IA en Afrique Francophone</strong> vous sera envoyé dans quelques minutes à l&apos;adresse email renseignée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a1628' }}
            >
              <i className="ri-article-line" />
              Consulter nos articles
            </a>
            <a
              href="/services"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid rgba(212,168,42,0.4)', color: '#86BC25', background: 'rgba(212,168,42,0.06)' }}
            >
              <i className="ri-briefcase-line" />
              Découvrir nos services
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="telecharger-guide" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #1a2d4a 100%)' }}>
      {/* Décor */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #6B9B1F 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.35)' }}>
            <i className="ri-mail-send-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Téléchargement gratuit</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            Recevez votre guide
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}en 30 secondes
            </span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            Remplissez le formulaire ci-dessous. Le PDF de 47 pages vous sera envoyé immédiatement par email.
          </p>
        </div>

        <div
          className="rounded-3xl p-8 md:p-12"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,168,42,0.15)', backdropFilter: 'blur(10px)' }}
        >
          <form
            id="guide-seo-ia-afrique"
            data-readdy-form
            action="https://readdy.ai/api/form/d8co91fejtnocflsn680"
            method="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {/* Prénom */}
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-white/80 mb-2">
                  Prénom <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.prenom ? 'rgba(239,68,68,0.5)' : 'rgba(212,168,42,0.2)'}` }}
                  placeholder="Jean"
                  required
                />
                {errors.prenom && <p className="text-red-400 text-xs mt-1">{errors.prenom}</p>}
              </div>

              {/* Nom */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-white/80 mb-2">
                  Nom <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.nom ? 'rgba(239,68,68,0.5)' : 'rgba(212,168,42,0.2)'}` }}
                  placeholder="Dupont"
                  required
                />
                {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email professionnel <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(212,168,42,0.2)'}` }}
                  placeholder="jean.dupont@entreprise.com"
                  required
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Entreprise */}
              <div>
                <label htmlFor="entreprise" className="block text-sm font-medium text-white/80 mb-2">
                  Entreprise <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.entreprise ? 'rgba(239,68,68,0.5)' : 'rgba(212,168,42,0.2)'}` }}
                  placeholder="Nom de votre entreprise"
                  required
                />
                {errors.entreprise && <p className="text-red-400 text-xs mt-1">{errors.entreprise}</p>}
              </div>

              {/* Fonction */}
              <div>
                <label htmlFor="fonction" className="block text-sm font-medium text-white/80 mb-2">
                  Fonction <span className="text-red-400">*</span>
                </label>
                <select
                  id="fonction"
                  name="fonction"
                  value={formData.fonction}
                  onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.fonction ? 'rgba(239,68,68,0.5)' : 'rgba(212,168,42,0.2)'}` }}
                  required
                >
                  <option value="" className="bg-gray-900 text-white">Sélectionnez...</option>
                  {fonctions.map((f) => (
                    <option key={f} value={f} className="bg-gray-900 text-white">{f}</option>
                  ))}
                </select>
                {errors.fonction && <p className="text-red-400 text-xs mt-1">{errors.fonction}</p>}
              </div>

              {/* Pays */}
              <div>
                <label htmlFor="pays" className="block text-sm font-medium text-white/80 mb-2">
                  Pays <span className="text-red-400">*</span>
                </label>
                <select
                  id="pays"
                  name="pays"
                  value={formData.pays}
                  onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.pays ? 'rgba(239,68,68,0.5)' : 'rgba(212,168,42,0.2)'}` }}
                  required
                >
                  <option value="" className="bg-gray-900 text-white">Sélectionnez...</option>
                  {pays.map((p) => (
                    <option key={p} value={p} className="bg-gray-900 text-white">{p}</option>
                  ))}
                </select>
                {errors.pays && <p className="text-red-400 text-xs mt-1">{errors.pays}</p>}
              </div>
            </div>

            {/* Besoin */}
            <div className="mb-6">
              <label htmlFor="besoin" className="block text-sm font-medium text-white/80 mb-2">
                Votre principal besoin en visibilité (optionnel)
              </label>
              <textarea
                id="besoin"
                name="besoin"
                value={formData.besoin}
                onChange={(e) => setFormData({ ...formData, besoin: e.target.value })}
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all resize-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,168,42,0.2)' }}
                placeholder="Décrivez brièvement votre situation actuelle et vos objectifs de référencement..."
              />
              <p className="text-white/30 text-xs mt-1 text-right">{formData.besoin.length}/500</p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a1628' }}
            >
              <i className="ri-download-line text-xl" />
              Recevoir mon guide gratuit
            </button>

            <p className="text-center text-white/30 text-xs mt-4">
              <i className="ri-lock-line mr-1" />
              Vos données sont protégées et ne seront jamais partagées. Conformité RGPD.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}