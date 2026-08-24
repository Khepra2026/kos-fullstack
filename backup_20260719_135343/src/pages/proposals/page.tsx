import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import { useProposals } from '';
import { useCrmData } from '@/pages/crm/hooks/useCrmData';
import ProposalStatsCards from '';
import ProposalCreateModal from '';
import ProposalDetailModal from '';

export default function ProposalsPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date');

  const {
    proposals,
    stats,
    loading,
    error,
    selectedProposal,
    setSelectedProposal,
    loadProposals,
    generateProposal,
    updateStatus,
    deleteProposal,
    statusLabels,
  } = useProposals();

  const { leads, loadLeads } = useCrmData();

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated, loadLeads]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('dashboard_auth', 'true');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <SeoHead
          title="Propositions — KHEPRA EXPERTS"
          description="Gestion des propositions commerciales"
          canonicalPath="/proposals"
          noIndex={true}
        />
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-paper-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Propositions KHEPRA</h1>
            <p className="text-sm text-slate-500 mt-1">Génération et gestion des propositions commerciales</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-semibold hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer"
              type="button"
            >
              Accéder aux Propositions
            </button>
          </div>
          <div className="mt-4 text-center flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              type="button"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/crm')}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              type="button"
            >
              CRM
            </button>
            <button
              onClick={() => navigate('/email-sequences')}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              type="button"
            >
              Séquences
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredProposals = proposals
    .filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client_organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'amount') return (b.amount || 0) - (a.amount || 0);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <>
      <SeoHead
        title="Propositions Commerciales — KHEPRA EXPERTS"
        description="Génération automatique de propositions commerciales PDF"
        canonicalPath="/proposals"
        noIndex={true}
      />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  type="button"
                  title="Retour au Dashboard"
                >
                  <i className="ri-arrow-left-line text-lg w-5 h-5 flex items-center justify-center"></i>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c19a6b] to-[#a47c48] flex items-center justify-center">
                    <i className="ri-file-paper-line text-white w-4 h-4 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-slate-900">Propositions</h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Documents Commerciaux</p>
                  </div>
                </div>
                <span className="hidden md:inline text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                  Phase 4 — Machine de Croissance
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2">
                  <i className="ri-search-line text-slate-400 w-4 h-4 flex items-center justify-center mr-2"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="bg-transparent text-sm text-slate-700 focus:outline-none w-40"
                  />
                </div>

                {/* Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="hidden md:block text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c19a6b]"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="draft">Brouillon</option>
                  <option value="sent">Envoyée</option>
                  <option value="viewed">Vue</option>
                  <option value="accepted">Acceptée</option>
                  <option value="rejected">Refusée</option>
                  <option value="expired">Expirée</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'status')}
                  className="hidden md:block text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#c19a6b]"
                >
                  <option value="date">Date</option>
                  <option value="amount">Montant</option>
                  <option value="status">Statut</option>
                </select>

                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white rounded-lg text-sm font-medium hover:from-[#a47c48] hover:to-[#8b6a3a] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                  Nouvelle Proposition
                </button>

                <button
                  onClick={loadProposals}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                  type="button"
                  title="Rafraîchir"
                >
                  <i className="ri-refresh-line w-4 h-4 flex items-center justify-center text-slate-600"></i>
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem('dashboard_auth');
                    setIsAuthenticated(false);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                  type="button"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {loading && !stats ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">Chargement des propositions...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <i className="ri-error-warning-line text-3xl text-red-500 mb-2 block"></i>
              <p className="text-red-700">{error}</p>
              <button
                onClick={loadProposals}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
                type="button"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="mb-6">
                <ProposalStatsCards stats={stats} />
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <i className="ri-file-paper-line text-amber-500 w-4 h-4 flex items-center justify-center"></i>
                    Propositions commerciales
                  </h2>
                  <span className="text-xs text-slate-500">{filteredProposals.length} propositions</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Client</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Proposition</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Montant</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Statut</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Vues</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredProposals.map((proposal) => {
                        const status = statusLabels[proposal.status];
                        return (
                          <tr
                            key={proposal.id}
                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() => setSelectedProposal(proposal)}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                                  {proposal.client_name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-slate-900">{proposal.client_name}</div>
                                  <div className="text-xs text-slate-500">{proposal.client_email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700 max-w-xs truncate">
                              {proposal.title}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-medium">
                                {proposal.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">
                              {proposal.amount ? `${proposal.amount.toLocaleString('fr-FR')} ${proposal.currency}` : '—'}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.bg || 'bg-slate-100'} ${status?.color || 'text-slate-700'}`}>
                                {status?.label || proposal.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(proposal.created_at).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {proposal.view_count > 0 ? (
                                <span className="flex items-center gap-1 text-indigo-600">
                                  <i className="ri-eye-line w-3 h-3 flex items-center justify-center"></i>
                                  {proposal.view_count}
                                </span>
                              ) : (
                                '—'
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const html = proposal.custom_fields?.html_preview as string;
                                    if (html) {
                                      const w = window.open('', '_blank');
                                      if (w) {
                                        w.document.write(html);
                                        w.document.close();
                                      }
                                    }
                                  }}
                                  className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center hover:bg-amber-100 transition-colors cursor-pointer"
                                  type="button"
                                  title="Ouvrir PDF"
                                >
                                  <i className="ri-eye-line w-3 h-3 flex items-center justify-center text-amber-600"></i>
                                </button>
                                <a
                                  href={`mailto:${proposal.client_email}?subject=Proposition: ${encodeURIComponent(proposal.title)}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
                                  title="Envoyer"
                                >
                                  <i className="ri-mail-send-line w-3 h-3 flex items-center justify-center text-blue-600"></i>
                                </a>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatus(proposal.id, 'sent');
                                  }}
                                  className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors cursor-pointer"
                                  type="button"
                                  title="Marquer envoyée"
                                >
                                  <i className="ri-check-line w-3 h-3 flex items-center justify-center text-emerald-600"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {filteredProposals.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <i className="ri-file-paper-line text-4xl mb-2 block"></i>
                    <p className="text-sm">Aucune proposition trouvée</p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors cursor-pointer"
                      type="button"
                    >
                      Créer une proposition
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <ProposalCreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          leads={leads.map((l) => ({ id: l.id, full_name: l.full_name, email: l.email, organization: l.organization }))}
          onGenerate={async (data) => {
            const result = await generateProposal(data);
            if (result.success) {
              setShowCreateModal(false);
              if (result.htmlContent) {
                const w = window.open('', '_blank');
                if (w) {
                  w.document.write(result.htmlContent);
                  w.document.close();
                }
              }
            }
          }}
          loading={loading}
        />
      )}

      {/* Detail Modal */}
      {selectedProposal && (
        <ProposalDetailModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onStatusChange={updateStatus}
          onDelete={deleteProposal}
        />
      )}
    </>
  );
}



