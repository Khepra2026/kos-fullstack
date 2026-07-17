import { useState, FormEvent } from 'react';
import SeoHead from '@/components/feature/SeoHead';

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false);
  const [loadingTest, setLoadingTest] = useState(false);
  const [result, setResult] = useState<null | { success: boolean; emailSent: boolean; message: string; detail?: string }>(null);
  const [resultTest, setResultTest] = useState<null | { success: boolean; emailSent: boolean; message: string; detail?: string }>(null);
  const [formData, setFormData] = useState({
    name: 'Test Utilisateur',
    email: 'test@khepraexperts.com',
    phone: '+228 00 00 00 00',
    organization: 'KHEPRA TEST',
    subject: 'Test de notification email',
    message: 'Ceci est un email de test pour vérifier que la notification fonctionne correctement.\n\nEnvoyé depuis la page de test.',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setResultTest(null);

    try {
      const response = await fetch(
        'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/submit-form',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZndoYWhpd3F2cWVhaHBpcmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTQyMjQsImV4cCI6MjA1MjE3MDIyNH0.XCL4N3TwYwLrKMfLz4w0yDq1nDqD8k1R5T7v1uF8v6w',
          },
          body: JSON.stringify({
            action: 'notify',
            formData: {
              full_name: formData.name,
              email: formData.email,
              phone: formData.phone,
              organization: formData.organization,
              subject: formData.subject,
              message: formData.message,
            },
            formId: 'test-email-page',
            sourcePage: '/test-email',
            leadId: `test-${Date.now()}`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          emailSent: data.emailSent,
          message: data.emailSent
            ? 'Notification envoyée avec succès !'
            : 'Notification traitée mais l\'email n\'a pas été envoyé (RESEND_API_KEY probablement manquante).',
          detail: JSON.stringify(data, null, 2),
        });
      } else {
        setResult({
          success: false,
          emailSent: false,
          message: data.error || 'Erreur lors de l\'envoi de la notification',
          detail: JSON.stringify(data, null, 2),
        });
      }
    } catch (err) {
      setResult({
        success: false,
        emailSent: false,
        message: 'Erreur réseau ou fonction indisponible',
        detail: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestToContact = async () => {
    setLoadingTest(true);
    setResult(null);
    setResultTest(null);

    try {
      const response = await fetch(
        'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/submit-form',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZndoYWhpd3F2cWVhaHBpcmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTQyMjQsImV4cCI6MjA1MjE3MDIyNH0.XCL4N3TwYwLrKMfLz4w0yDq1nDqD8k1R5T7v1uF8v6w',
          },
          body: JSON.stringify({
            action: 'notify',
            formData: {
              full_name: 'Test Redirection',
              email: 'test@khepraexperts.com',
              phone: '+228 93 98 49 09',
              organization: 'KHEPRA EXPERTS',
              subject: 'Vérification de la redirection email',
              message: 'Ceci est un email de test pour vérifier que la redirection vers contact@khepraexperts.com fonctionne correctement.\n\nSi vous recevez ce mail, la configuration est opérationnelle.',
            },
            formId: 'test-redirection',
            sourcePage: '/test-email',
            leadId: `test-redirection-${Date.now()}`,
            testRecipient: 'contact@khepraexperts.com',
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResultTest({
          success: true,
          emailSent: data.emailSent,
          message: data.emailSent
            ? 'Email test envoyé avec succès à contact@khepraexperts.com ! Vérifiez votre boîte de réception.'
            : 'Email test traité mais non envoyé (RESEND_API_KEY manquante dans Supabase).',
          detail: JSON.stringify(data, null, 2),
        });
      } else {
        setResultTest({
          success: false,
          emailSent: false,
          message: data.error || 'Erreur lors de l\'envoi du test',
          detail: JSON.stringify(data, null, 2),
        });
      }
    } catch (err) {
      setResultTest({
        success: false,
        emailSent: false,
        message: 'Erreur réseau ou fonction indisponible',
        detail: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoadingTest(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SeoHead
        title="Test Email — KHEPRA EXPERTS"
        description="Page de test interne — accès privé"
        canonicalPath="/test-email"
        noIndex={true}
      />
      <div className="min-h-screen bg-[#fafafa] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[rgba(134,188,37,0.1)] border border-[rgba(134,188,37,0.28)] rounded-full text-xs font-bold tracking-widest uppercase text-[#86BC25] mb-4">
              <i className="ri-mail-send-line" />
              Test Email
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#111] tracking-tight mb-3">
              Tester l'envoi d'email
            </h1>
            <p className="text-[#6b7280] text-base max-w-md mx-auto">
              Cette page permet de vérifier que l'Edge Function{' '}
              <code className="text-[#86BC25] bg-[rgba(134,188,37,0.08)] px-1.5 py-0.5 rounded text-sm">submit-form</code>{' '}
              fonctionne correctement.
            </p>
          </div>

          {/* Result Card — Test vers contact@khepraexperts.com */}
          {resultTest && (
            <div
              className={`mb-6 p-5 rounded-xl border ${
                resultTest.success
                  ? resultTest.emailSent
                    ? 'bg-[#f0fdf4] border-[#86BC25]'
                    : 'bg-[#fffbeb] border-[#f59e0b]'
                  : 'bg-[#fef2f2] border-[#ef4444]'
              } animate-fadeSlideUp`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${
                  resultTest.success
                    ? resultTest.emailSent
                      ? 'bg-[#86BC25] text-white'
                      : 'bg-[#f59e0b] text-white'
                    : 'bg-[#ef4444] text-white'
                }`}>
                  <i className={`${
                    resultTest.success
                      ? resultTest.emailSent ? 'ri-check-line' : 'ri-alert-line'
                      : 'ri-close-line'
                  } text-lg`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm mb-1 ${
                    resultTest.success
                      ? resultTest.emailSent ? 'text-[#166534]' : 'text-[#92400e]'
                      : 'text-[#991b1b]'
                  }`}>
                    {resultTest.success
                      ? resultTest.emailSent
                        ? 'Test envoyé — Vérifiez contact@khepraexperts.com'
                        : 'Test simulé — Clé API manquante'
                      : 'Échec du test'}
                  </p>
                  <p className={`text-sm ${
                    resultTest.success
                      ? resultTest.emailSent ? 'text-[#166534]' : 'text-[#92400e]'
                      : 'text-[#991b1b]'
                  }`}>
                    {resultTest.message}
                  </p>
                  {resultTest.detail && (
                    <pre className="mt-3 text-xs bg-white/60 rounded-lg p-3 overflow-x-auto text-[#374151]">
                      {resultTest.detail}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Result Card — Test notification */}
          {result && (
            <div
              className={`mb-6 p-5 rounded-xl border ${
                result.success
                  ? result.emailSent
                    ? 'bg-[#f0fdf4] border-[#86BC25]'
                    : 'bg-[#fffbeb] border-[#f59e0b]'
                  : 'bg-[#fef2f2] border-[#ef4444]'
              } animate-fadeSlideUp`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${
                  result.success
                    ? result.emailSent ? 'bg-[#86BC25] text-white' : 'bg-[#f59e0b] text-white'
                    : 'bg-[#ef4444] text-white'
                }`}>
                  <i className={`${
                    result.success
                      ? result.emailSent ? 'ri-check-line' : 'ri-alert-line'
                      : 'ri-close-line'
                  } text-lg`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm mb-1 ${
                    result.success
                      ? result.emailSent ? 'text-[#166534]' : 'text-[#92400e]'
                      : 'text-[#991b1b]'
                  }`}>
                    {result.success
                      ? result.emailSent ? 'Succès — Email envoyé' : 'Partiel — Email simulé'
                      : 'Échec'}
                  </p>
                  <p className={`text-sm ${
                    result.success
                      ? result.emailSent ? 'text-[#166534]' : 'text-[#92400e]'
                      : 'text-[#991b1b]'
                  }`}>
                    {result.message}
                  </p>
                  {result.detail && (
                    <pre className="mt-3 text-xs bg-white/60 rounded-lg p-3 overflow-x-auto text-[#374151]">
                      {result.detail}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Test Button */}
          <div className="mb-6 bg-[#111] rounded-2xl border border-[rgba(134,188,37,0.15)] p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[rgba(134,188,37,0.15)] flex-shrink-0">
                <i className="ri-route-line text-[#86BC25] text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-white text-base mb-1">
                  Vérifier la redirection contact@khepraexperts.com
                </h3>
                <p className="text-[#9a9a9a] text-sm leading-relaxed mb-4">
                  Cliquez ci-dessous pour envoyer immédiatement un email test à{' '}
                  <strong className="text-[#86BC25]">contact@khepraexperts.com</strong>.
                  Si vous recevez le mail, la redirection et la configuration Resend fonctionnent parfaitement.
                </p>
                <button
                  onClick={handleTestToContact}
                  disabled={loadingTest}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-[#86BC25] hover:bg-[#6B9B1F] text-white font-semibold text-sm rounded-full transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {loadingTest ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <i className="ri-mail-check-line" />
                      Envoyer un test à contact@khepraexperts.com
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-[rgba(134,188,37,0.12)] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(134,188,37,0.1)]">
                <i className="ri-settings-3-line text-[#86BC25] text-sm" />
              </div>
              <h2 className="font-display font-semibold text-[#111] text-base">
                Test notification formulaire de contact
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Nom complet</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#e5e3df] bg-[#fafafa] text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#86BC25]/40 focus:border-[#86BC25] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#e5e3df] bg-[#fafafa] text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#86BC25]/40 focus:border-[#86BC25] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#e5e3df] bg-[#fafafa] text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#86BC25]/40 focus:border-[#86BC25] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Organisation</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#e5e3df] bg-[#fafafa] text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#86BC25]/40 focus:border-[#86BC25] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Sujet</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e3df] bg-[#fafafa] text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#86BC25]/40 focus:border-[#86BC25] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e3df] bg-[#fafafa] text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#86BC25]/40 focus:border-[#86BC25] transition-all resize-y"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 bg-[#86BC25] hover:bg-[#6B9B1F] text-white font-semibold text-sm rounded-full transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line" />
                      Envoyer le test
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-[#111] rounded-2xl border border-[rgba(134,188,37,0.12)] p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(134,188,37,0.15)] flex-shrink-0">
                <i className="ri-information-line text-[#86BC25] text-lg" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white text-sm mb-1.5">
                  Destinataires des notifications
                </h3>
                <p className="text-[#9a9a9a] text-sm leading-relaxed">
                  Par défaut, les notifications sont envoyées à l'adresse configurée dans les secrets Supabase.
                  Le bouton de test rapide ci-dessus envoie directement à{' '}
                  <strong className="text-[#86BC25]">contact@khepraexperts.com</strong>.
                  Si la clé <code className="text-[#86BC25] text-xs">RESEND_API_KEY</code> n'est pas configurée dans Supabase,
                  l'email sera <strong className="text-[#f59e0b]">simulé</strong> (loggé mais non envoyé).
                </p>
              </div>
            </div>
          </div>

          {/* Logs link */}
          <div className="mt-6 text-center">
            <a
              href="https://pgfwhahiwqvqeahpirjx.supabase.co/project/_/logs/edge-functions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#86BC25] transition-colors"
            >
              <i className="ri-external-link-line" />
              Voir les logs dans Supabase Dashboard
            </a>
          </div>
        </div>
      </div>
    </>
  );
}