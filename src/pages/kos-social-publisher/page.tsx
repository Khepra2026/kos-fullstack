import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import SeoHead from '@/components/feature/SeoHead';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';

export default function KOSSocialPublisherPage() {
  const { data: pages } = useQuery({
    queryKey: ['kb_pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kb_pages')
        .select('slug,title')
        .limit(1000);
      if (error) throw new Error(error.message);
      return data;
    },
  });

  return (
    <>
      <SeoHead
        title="KOS AI Social Publisher — Niveau Big Four | KHEPRA EXPERTS"
        description="Cockpit de création et approbation de campagnes social media KOS AI. Séparation des devoirs 4-eyes, planification multi-réseaux, génération automatique de copy Big Four."
        canonical="https://khepraexperts.com/kos-social-publisher"
      />

      <main className="min-h-screen bg-background-50">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8">
            <h1 className="text-heading-md font-heading text-foreground-950">
              KOS AI Social Publisher
            </h1>
            <p className="mt-2 text-body-md text-foreground-600">
              Niveau Big Four — Création, approbation 4-eyes et publication automatique
              sur 7 réseaux sociaux, directement depuis les pages Knowledge Base.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Formulaire de création */}
            <section className="rounded-xl border border-background-300 bg-background-50 p-5 md:p-6 shadow-premium">
              <CampaignForm pages={pages || []} />
            </section>

            {/* Liste et approbation */}
            <section className="rounded-xl border border-background-300 bg-background-50 p-5 md:p-6 shadow-premium">
              <CampaignList />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}