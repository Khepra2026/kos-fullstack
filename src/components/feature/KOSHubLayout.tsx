import KOSHubSwitcher from '@/components/feature/KOSHubSwitcher';

interface KOSHubLayoutProps {
  hubId: number;
  activeTab?: string;
  tabLabel?: string;
  children: React.ReactNode;
}

export default function KOSHubLayout({ hubId, activeTab, tabLabel, children }: KOSHubLayoutProps) {
  return (
    <div className="min-h-screen bg-background-50">
      <KOSHubSwitcher currentHubId={hubId} activeTab={activeTab} tabLabel={tabLabel} />
      {children}
    </div>
  );
}