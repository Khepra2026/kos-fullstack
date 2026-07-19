import hubSwitcher from '@/components/feature/hubSwitcher';

interface hubLayoutProps {
  hubId: number;
  activeTab?: string;
  tabLabel?: string;
  children: React.ReactNode;
}

export default function hubLayout({ hubId, activeTab, tabLabel, children }: hubLayoutProps) {
  return (
    <div className="min-h-screen bg-background-50">
      <hubSwitcher currentHubId={hubId} activeTab={activeTab} tabLabel={tabLabel} />
      {children}
    </div>
  );
}



