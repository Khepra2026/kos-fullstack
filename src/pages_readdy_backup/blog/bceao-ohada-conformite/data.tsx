import { Link } from 'react-router-dom';

export interface ArticleSection {
  id: string;
  heading: string;
  content: JSX.Element;
}

export interface GeoDirectAnswer {
  q: string;
  a: string;
}

export interface DistinctionCategory {
  type: 'obligation' | 'bonne-pratique' | 'standard';
  label: string;
  description: string;
  icon: string;
  items: Array<{ text: string; reference: string }>;
}

export interface ArticleData {
  title: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  modifiedDate: string;
  author: string;
  authorTitle: string;
  methodologyNote: string;
  category: string;
  tags: string[];
  heroAlt: string;
  sections: ArticleSection[];
  faq: Array<{ q: string; a: string }>;
  geoDirectAnswers: GeoDirectAnswer[];
  distinctionObligation: {
    heading: string;
    intro: string;
    categories: DistinctionCategory[];
  };
  avertissement: {
    heading: string;
    paragraphs: string[];
  };
  metaDescription: string;
  metaKeywords: string;
}

export const articleFR: ArticleData = {
  title: 'Conformité BCEAO et OHADA : cadre réglementaire, obligations prudentielles et gouvernance pour les institutions financières en Afrique de l\'Ouest',
  excerpt: 'La maîtrise du cadre réglementaire BCEAO et du droit OHADA constitue un impératif de gouvernance pour les institutions financières, les établissements de monnaie électronique et les entreprises opérant dans l\'espace UEMOA. Au-delà de la conformité formelle, elle conditionne l\'accès aux financements, la pérennité opérationnelle et la crédibilité institutionnelle.',
  readTime: '14 min de lecture',
  publishedDate: '11 mai 2026',
  modifiedDate: '20 juin 2026',
  author: 'SIMDA Essoyomèwè',
  authorTitle: 'Directeur Associé & Fondateur, KHEPRA EXPERTS',
  methodologyNote: 'Cet article a été rédigé selon la méthodologie KHEPRA EXPERTS de revue réglementaire : analyse des textes officiels en vigueur (Instructions BCEAO, Circulaires CB-UMOA, Directive UEMOA n°02/2015, Actes Uniformes OHADA, normes GAFI/Bâle), croisement avec les observations terrain issues de missions d\'audit et de conformité en zone UEMOA, et relecture par un Senior Partner. Dernière mise à jour : 20 juin 2026.',
  category: 'Conformité & Réglementation',
  tags: ['BCEAO', 'OHADA', 'Conformité', 'Institutions financières', 'Prudentiel', 'AML/CFT', 'KYC', 'Gouvernance'],
  heroAlt: 'Conformité BCEAO OHADA Afrique de l\'Ouest — KHEPRA EXPERTS',
  metaDescription: 'Cadre réglementaire BCEAO et droit OHADA : obligations prudentielles, AML/CFT, KYC, cybersécurité, gouvernance et conformité digitale pour les institutions financières en zone UEMOA.',
  metaKeywords: 'conformité BCEAO, conformité OHADA, réglementation microfinance Afrique, audit financier UEMOA, AML/CFT BCEAO, KYC microfinance, gouvernance prudentielle',
  sections: [
    {
      id: 'introduction',
      heading: 'Introduction : La conformité comme fondement de la crédibilité institutionnelle',
      content: (
        <div className="space-y-4">
          <p>
            Dans l\'espace UEMOA, la conformité aux exigences de la <strong>Banque Centrale des États de l\'Afrique de l\'Ouest (BCEAO)</strong> et du droit <strong>OHADA</strong> constitue un pilier de la gouvernance des institutions financières et des entreprises. Elle ne se limite pas à une obligation légale : elle structure la relation de confiance avec les superviseurs, les partenaires financiers et les clients.
          </p>
          <p>
            La BCEAO élabore la <strong>réglementation prudentielle</strong> applicable aux banques, aux systèmes financiers décentralisés (SFD), aux établissements de monnaie électronique et aux autres institutions financières des huit États membres de l\'UEMOA. La <strong>supervision prudentielle</strong> — contrôle sur place et à distance, inspections, sanctions — relève du <strong>Secrétariat Général de la Commission Bancaire de l\'Union Monétaire Ouest Africaine (SG-CB-UMOA)</strong>, en application des Instructions n°026 à 029/11/2016.
          </p>
          <p>
            Le droit <strong>OHADA</strong> (Organisation pour l\'Harmonisation en Afrique du Droit des Affaires) unifie le cadre juridique des activités commerciales dans ses 17 États membres. Pour les entreprises de la zone, la conformité OHADA garantit la sécurité juridique des contrats, la validité des statuts et la transparence comptable via le référentiel <strong>SYSCOHADA</strong>.
          </p>
          <p>
            Cet article présente de manière structurée les obligations réglementaires applicables, les risques de non-conformité et les bonnes pratiques de gouvernance, à destination des dirigeants, administrateurs et responsables de conformité des institutions financières africaines.
          </p>
        </div>
      ),
    },
    {
      id: 'bceao-cadre',
      heading: 'Cadre prudentiel BCEAO : textes de référence et obligations des institutions financières',
      content: (
        <div className="space-y-4">
          <p>
            La réglementation prudentielle de la BCEAO s\'articule autour de plusieurs textes fondamentaux, complétés par les Instructions de la Commission Bancaire de l\'UMOA. Les institutions doivent en maîtriser la portée opérationnelle.
          </p>
          <ul className="space-y-3 pl-4">
            {[
              { t: 'Instruction n°010-08-2010 relative aux règles prudentielles des SFD relative aux SFD', d: 'Cadre d\'agrément, d\'organisation et de surveillance prudentielle des systèmes financiers décentralisés. Fixe les ratios de liquidité, les exigences de fonds propres et les règles de gouvernance applicables aux SFD de catégories 1, 2 et 3.' },
              { t: 'Instructions n°026 à 029/11/2016 (CB-UMOA)', d: 'Normes prudentielles applicables aux banques et aux SFD : ratio de solvabilité (Cooke adapté), ratio de liquidité, division des risques, provisions pour créances douteuses, et exigences de reporting à la Commission Bancaire.' },
              { t: 'Instruction sur la monnaie électronique', d: 'La BCEAO encadre l\'émission de monnaie électronique via des exigences de capital minimum, de ségregation des fonds clients et de reporting périodique. Les émetteurs doivent respecter des normes de gouvernance spécifiques.' },
              { t: 'Directive UEMOA n°02/2015 relative à la LBC/FT', d: 'Cadre régional de lutte contre le blanchiment de capitaux et le financement du terrorisme. Oblige les institutions financières à mettre en place une Approche Basée sur les Risques (ABR), des procédures KYC et un dispositif de déclaration des soupçons.' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-arrow-right-s-line text-xs" style={{ color: '#c9a227' }} />
                </div>
                <div><strong>{item.t} :</strong> {item.d}</div>
              </li>
            ))}
          </ul>
          <div className="p-5 rounded-xl border-l-4" style={{ background: '#fffbeb', borderColor: '#c9a227' }}>
            <p className="font-semibold text-gray-800 mb-1">Précision institutionnelle</p>
            <p className="text-gray-700 text-sm leading-relaxed">La BCEAO définit la politique monétaire et élabore le cadre prudentiel régional. Le SG-CB-UMOA assure le contrôle sur place et à distance des institutions et prononce les sanctions. Les deux institutions collaborent dans le suivi des ratios et la gestion des crises. Une institution financière est tenue de répondre aux deux niveaux de supervision.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'aml-cft-kyc',
      heading: 'AML/CFT et KYC : obligations réglementaires et mise en œuvre opérationnelle',
      content: (
        <div className="space-y-4">
          <p>
            La <strong>Directive UEMOA n°02/2015</strong> transpose dans l\'espace UEMOA les standards du <strong>GAFI</strong> (Groupe d\'Action Financière) et du <strong>GIABA</strong> (Groupe Intergouvernemental d\'Action contre le Blanchiment d\'Argent en Afrique de l\'Ouest). Toute institution financière, y compris les SFD et les établissements de monnaie électronique, est soumise à ces exigences.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Approche Basée sur les Risques (ABR)', desc: 'L\'institution doit évaluer son exposition au risque de blanchiment selon quatre dimensions : clients, produits et services, canaux de distribution, et zones géographiques. Les mesures de due diligence doivent être proportionnées au niveau de risque identifié.', color: '#c9a227' },
              { title: 'Know Your Customer (KYC)', desc: 'Identification et vérification de l\'identité de chaque client. Mise à jour des données en cas de changement. Conservation des pièces justificatives pendant dix ans au minimum, conformément aux exigences de traçabilité.', color: '#22a05a' },
              { title: 'Déclaration des soupçons', desc: 'Toute opération suspecte doit être signalée à la Cellule Nationale de Traitement des Informations Financières (CENTIF) du pays concerné, dans un délai compatible avec les exigences de la Directive n°02/2015.', color: '#c9a227' },
              { title: 'Responsable Conformité LBC/FT (RCLBC/FT)', desc: 'Désignation d\'un responsable dédié, formé aux exigences AML/CFT, rattaché fonctionnellement au directeur général et au Conseil d\'Administration. Ce rôle est vérifié lors des inspections de la BCEAO et de la CB-UMOA.', color: '#22a05a' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                <h4 className="font-bold text-gray-900 text-sm mb-2" style={{ color: item.color }}>{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            La non-conformité AML/CFT expose l\'institution à des sanctions réglementaires (injonction, restriction d\'agrément, retrait d\'agrément) et à des sanctions pénales pour les dirigeants responsables, conformément aux textes nationaux de transposition de la Directive UEMOA n°02/2015.
          </p>
        </div>
      ),
    },
    {
      id: 'cybersecurite-donnees',
      heading: 'Cybersécurité, fraude digitale et protection des données clients',
      content: (
        <div className="space-y-4">
          <p>
            La digitalisation des services financiers en zone UEMOA amplifie les risques cybernétiques. La BCEAO attend des émetteurs de monnaie électronique et des institutions financières qu\'ils intègrent la <strong>cybersécurité</strong> dans leur dispositif de gouvernance des risques.
          </p>
          <div className="space-y-3">
            {[
              { title: 'Sécurité des systèmes d\'information', desc: 'Mise en place de politiques de sécurité informatique, contrôle d\'accès, chiffrement des données sensibles, et plans de continuité d\'activité. Les incidents de sécurité doivent être documentés et, selon leur gravité, signalés aux superviseurs.', color: '#ef4444' },
              { title: 'Fraude digitale et transactionnelle', desc: 'Déploiement de systèmes de détection des transactions anormales, authentification forte des clients (MFA), et veille sur les nouvelles modalités de fraude (phishing, usurpation d\'identité, compromission de terminaux).', color: '#f59e0b' },
              { title: 'Protection des données personnelles', desc: 'Conformité aux cadres nationaux de protection des données (lois sur la protection des données à caractère personnel dans chaque État membre) et aux bonnes pratiques régionales. Consentement des clients, limitation de la collecte, et droit d\'accès.', color: '#22a05a' },
              { title: 'Conformité cloud et traçabilité', desc: 'En cas d\'hébergement cloud, l\'institution doit garantir la localisation des données conformément aux exigences nationales, assurer la traçabilité des accès, et conserver les journaux d\'audit pour les besoins de l\'inspection prudentielle.', color: '#c9a227' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: item.color }} />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'gouvernance-reclamations',
      heading: 'Gouvernance des réclamations, contrôle interne et responsabilité du Conseil',
      content: (
        <div className="space-y-4">
          <p>
            La gouvernance des institutions financières en zone UEMOA repose sur une architecture de trois lignes de défense, encadrée par les Instructions de la CB-UMOA et les normes de la BCEAO.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: 'ri-shield-check-line', title: 'Contrôle interne', desc: 'Mise en place d\'une fonction de contrôle interne indépendante, d\'une cartographie des risques actualisée, et d\'un plan d\'audit interne annuel. Le contrôle interne couvre les risques opérationnels, financiers, de conformité et de réputation.', color: '#22a05a' },
              { icon: 'ri-user-voice-line', title: 'Gouvernance des réclamations', desc: 'Procédure formalisée de réception, d\'enregistrement, de traitement et de réponse aux réclamations clients. Délais de réponse définis, registre des réclamations tenu à jour, et escalade vers la médiation institutionnelle lorsque nécessaire.', color: '#c9a227' },
              { icon: 'ri-team-line', title: 'Responsabilité du Conseil d\'Administration', desc: 'Le Conseil définit l\'appétence pour le risque, valide les politiques prudentielles, et supervise le dispositif de gouvernance. Les comités spécialisés (audit, risques, ALM, crédit) assurent un pilotage technique des risques.', color: '#22a05a' },
              { icon: 'ri-file-search-line', title: 'Auditabilité et supervision', desc: 'L\'institution doit permettre l\'audit périodique de son dispositif de protection clientèle par des auditeurs internes et externes. La traçabilité des décisions, la conservation des documents et l\'accès aux données sont des exigences d\'inspection.', color: '#c9a227' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg mb-3" style={{ background: `${item.color}15` }}>
                  <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border-l-4" style={{ background: '#f0fdf4', borderColor: '#22a05a' }}>
            <p className="font-semibold text-gray-800 mb-2">Bonnes pratiques en matière de gouvernance</p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li className="flex items-start gap-2"><span style={{ color: '#22a05a' }}>•</span>Réunions du Conseil d\'Administration au minimum trimestriellement, avec compte rendu formalisé</li>
              <li className="flex items-start gap-2"><span style={{ color: '#22a05a' }}>•</span>Réunions du Comité ALM trimestrielles pour les institutions collectant des dépôts du public</li>
              <li className="flex items-start gap-2"><span style={{ color: '#22a05a' }}>•</span>Rapport annuel de l\'audit interne transmis au Conseil et aux superviseurs</li>
              <li className="flex items-start gap-2"><span style={{ color: '#22a05a' }}>•</span>Revue annuelle de la cartographie des risques et des plans de remediation</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'ohada-entreprises',
      heading: 'OHADA : sécurité juridique, comptabilité SYSCOHADA et opérations transfrontalières',
      content: (
        <div className="space-y-4">
          <p>
            Le droit OHADA couvre un spectre étendu des activités commerciales à travers ses <strong>Actes Uniformes</strong>. Pour les entreprises de la zone, la conformité OHADA présente des avantages structurants, notamment en matière de sécurité juridique et de transparence comptable.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: 'ri-shield-check-line', title: 'Sécurité juridique des contrats', desc: 'Les contrats rédigés conformément aux Actes Uniformes OHADA sont valables et opposables dans les 17 États membres. Cette uniformité réduit les incertitudes juridiques lors des opérations transfrontalières.', color: '#22a05a' },
              { icon: 'ri-bank-line', title: 'Accès au financement', desc: 'Les établissements de crédit et les fonds d\'investissement conditionnent fréquemment leurs décisions de financement à la conformité des statuts, des états financiers et des contrats au droit OHADA et au SYSCOHADA.', color: '#c9a227' },
              { icon: 'ri-expand-right-line', title: 'Expansion régionale', desc: 'Opérer dans les 17 pays OHADA avec un cadre juridique harmonisé : Côte d\'Ivoire, Sénégal, Cameroun, Gabon, Tchad, Guinée Équatoriale, Congo, RCA, Comores, Togo, Bénin, Burkina Faso, Mali, Niger, Guinée-Bissau, RDC, Tchad.', color: '#22a05a' },
              { icon: 'ri-user-star-line', title: 'Attractivité institutionnelle', desc: 'La conformité OHADA constitue un indicateur de sérieux et de gouvernance pour les partenaires financiers internationaux, les bailleurs de fonds et les fonds d\'impact.', color: '#c9a227' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg mb-3" style={{ background: `${item.color}15` }}>
                  <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            L\'<strong>Acte Uniforme portant organisation et harmonisation des comptabilités des entreprises (AUDCIF)</strong> révisé en 2017 impose le référentiel SYSCOHADA. Les états financiers (bilan, compte de résultat, tableau des flux de trésorerie, notes annexes) doivent être produits conformément à ce référentiel pour être recevables auprès des superviseurs et des partenaires financiers.
          </p>
        </div>
      ),
    },
    {
      id: 'enjeux-pme',
      heading: 'Risques de non-conformité : sanctions réglementaires et conséquences opérationnelles',
      content: (
        <div className="space-y-4">
          <p>
            La non-conformité aux exigences BCEAO, CB-UMOA ou OHADA expose les institutions et les entreprises à un éventail de sanctions et de conséquences, dont certaines peuvent compromettre leur pérennité.
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'Sanctions réglementaires et retrait d\'agrément',
                desc: 'La BCEAO et la CB-UMOA disposent d\'un arsenal de mesures allant de l\'injonction de mise en conformité à la mise sous administration provisoire, et jusqu\'au retrait d\'agrément pour les cas les plus graves de non-conformité persistante.',
                icon: 'ri-error-warning-line',
                color: '#ef4444',
              },
              {
                title: 'Blocage de l\'accès au financement',
                desc: 'Les établissements de crédit, les banques de développement et les fonds d\'investissement exigent généralement un dossier de conformité complet avant toute décision de financement. Un dossier incomplet ou non conforme aux normes SYSCOHADA est fréquemment écarté.',
                icon: 'ri-lock-line',
                color: '#f59e0b',
              },
              {
                title: 'Risques juridiques et contentieux',
                desc: 'Des contrats mal rédigés, des statuts non conformes à l\'Acte Uniforme relatif au droit des sociétés commerciales et du GIE, ou une gouvernance défaillante exposent l\'entreprise à des litiges entre actionnaires et à des risques de nullité contractuelle.',
                icon: 'ri-scales-3-line',
                color: '#f59e0b',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-red-50 border border-red-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${item.color}15` }}>
                  <i className={`${item.icon} text-xl`} style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'strategie-conformite',
      heading: 'Construire un dispositif de conformité structuré et durable',
      content: (
        <div className="space-y-4">
          <p>
            La mise en conformité ne doit pas être appréhendée comme une démarche ponctuelle, mais comme un <strong>processus continu et structuré</strong>. Les institutions financières doivent intégrer la conformité dans leur gouvernance et leur pilotage quotidien.
          </p>
          <div className="space-y-4">
            {[
              { num: '01', title: 'Diagnostic de conformité', desc: 'Évaluation exhaustive des écarts entre la situation actuelle et les exigences BCEAO, CB-UMOA et OHADA applicables. Cartographie des risques réglementaires, AML/CFT, cybersécurité et gouvernance. Priorisation des actions correctives par niveau de criticité.', color: '#c9a227' },
              { num: '02', title: 'Plan de mise en conformité', desc: 'Élaboration d\'un plan d\'action détaillé avec des jalons clairs, des responsables désignés et un budget alloué. Le plan couvre la documentation des procédures, le renforcement du contrôle interne, la formation des équipes et la mise à jour des politiques LBC/FT et KYC.', color: '#22a05a' },
              { num: '03', title: 'Mise en œuvre et documentation', desc: 'Rédaction ou révision des manuels de procédures, mise à jour des statuts, renforcement de la fonction de contrôle interne, mise en place du dispositif de gouvernance des réclamations, et formation des équipes aux exigences réglementaires.', color: '#c9a227' },
              { num: '04', title: 'Monitoring et revue périodique', desc: 'Veille réglementaire permanente, revues périodiques de conformité, audits internes annuels du dispositif de protection clientèle, et adaptation aux évolutions des textes BCEAO, CB-UMOA et OHADA.', color: '#22a05a' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-xl bg-white border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 font-playfair font-bold text-lg" style={{ background: `${step.color}12`, color: step.color }}>
                  {step.num}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'conseil-stratégique-levee',
      heading: 'Conformité et accès au financement : un lien structurel',
      content: (
        <div className="space-y-4">
          <p>
            La conformité BCEAO/OHADA constitue un <strong>facteur déterminant</strong> dans les décisions de financement en Afrique de l\'Ouest. Qu\'il s\'agisse d\'un fonds d\'impact, d\'une banque de développement ou d\'un investisseur privé, la qualité du dossier de conformité influence significativement l\'évaluation du risque et la décision d\'engagement.
          </p>
          <p>
            Les investisseurs internationaux (IFC, BOAD, BAD, fonds d\'impact) conditionnent fréquemment leurs financements à la conformité prudentielle et à la qualité de la gouvernance. Un dossier ESG solide repose sur un dispositif de conformité documenté, auditable et conforme aux standards réglementaires.
          </p>
          <p>
            Chez KHEPRA EXPERTS, nous accompagnons les organisations dans cette démarche structurée, en articulant le{' '}
            <Link to="/services/conseil-strategique/" className="font-semibold underline" style={{ color: '#c9a227' }}>
              conseil stratégique
            </Link>{' '}
            et la{' '}
            <Link to="/services/levee-de-fonds/" className="font-semibold underline" style={{ color: '#22a05a' }}>
              levée de fonds
            </Link>{' '}
            : nous sécurisons d\'abord le dispositif de conformité réglementaire, puis nous structurons le dossier d\'investissement pour répondre aux exigences des partenaires financiers.
          </p>
          <div className="p-6 rounded-2xl" style={{ background: '#0a0a0a' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ background: '#c9a227' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#c9a227' }}>Notre approche intégrée</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: 'ri-shield-check-line', title: 'Phase 1 : Conformité & Gouvernance', items: ['Audit de conformité BCEAO/CB-UMOA/OHADA', 'Cartographie des risques réglementaires', 'Plan de mise en conformité AML/CFT/KYC', 'Mise en place du contrôle interne et des comités'], color: '#c9a227' },
                { icon: 'ri-funds-line', title: 'Phase 2 : Structuration du dossier', items: ['Business plan conforme SYSCOHADA', 'Due diligence préparatoire', 'Documentation ESG et gouvernance', 'Mise en relation avec les fonds'], color: '#22a05a' },
              ].map((phase, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-3">
                    <i className={`${phase.icon} text-lg`} style={{ color: phase.color }} />
                    <span className="text-sm font-bold text-white">{phase.title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: `${phase.color}20` }}>
                          <i className="ri-check-line text-xs" style={{ color: phase.color }} />
                        </div>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'conclusion',
      heading: 'Conclusion : La conformité comme fondement de la pérennité',
      content: (
        <div className="space-y-4">
          <p>
            La conformité BCEAO/OHADA constitue un <strong>fondement de la pérennité</strong> des institutions financières et des entreprises opérant en Afrique de l\'Ouest. Elle structure la relation avec les superviseurs, sécurise les opérations et renforce la crédibilité auprès des partenaires financiers.
          </p>
          <p>
            Les institutions qui investissent dans un dispositif de conformité complet — couvrant les ratios prudentiels, l\'AML/CFT, le KYC, la cybersécurité, la protection des données, la gouvernance des réclamations et le contrôle interne — disposent d\'un cadre de gouvernance robuste, reconnu par les superviseurs et les investisseurs internationaux.
          </p>
          <p>
            Chez KHEPRA EXPERTS, nous accompagnons les institutions financières et les entreprises dans la structuration et le renforcement de leur dispositif de conformité, en zone UEMOA et CEMAC, avec une approche fondée sur les textes réglementaires officiels et les bonnes pratiques prudentielles.
          </p>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: 'Quelle est la différence entre la BCEAO et la Commission Bancaire de l\'UMOA ?',
      a: 'La BCEAO est la banque centrale de l\'UEMOA. Elle définit la politique monétaire et élabore le cadre prudentiel régional pour les 8 États membres. La supervision prudentielle — inspections sur place et à distance, contrôle des ratios, mesures correctives — relève de la Commission Bancaire de l\'Union Monétaire Ouest Africaine (CB-UMOA) et de son Secrétariat Général (SG-CB-UMOA). Les deux institutions collaborent dans le suivi des ratios et la gestion des crises.',
    },
    {
      q: 'Quels textes réglementaires encadrent la conformité des SFD en zone UEMOA ?',
      a: 'Les textes principaux sont : l\'Instruction n°010-08-2010 relative aux règles prudentielles des SFD de la BCEAO relative aux conditions d\'agrément et de surveillance des SFD ; les Instructions n°026 à 029/11-2016 de la CB-UMOA fixant les normes prudentielles (solvabilité, liquidité, division des risques) ; et la Directive UEMOA n°02/2015 relative à la lutte contre le blanchiment de capitaux et le financement du terrorisme.',
    },
    {
      q: 'La conformité OHADA est-elle requise pour accéder au financement ?',
      a: 'Dans la pratique, les établissements de crédit, les banques de développement et les fonds d\'investissement exigent fréquemment la conformité OHADA comme condition préalable à l\'examen d\'un dossier de financement. Les statuts doivent être conformes à l\'Acte Uniforme relatif au droit des sociétés commerciales et du GIE, et les états financiers doivent respecter le référentiel SYSCOHADA. Cette exigence n\'est pas automatique dans tous les cas, mais elle constitue une norme de référence largement répandue.',
    },
    {
      q: 'Quel rôle joue le Conseil d\'Administration dans la conformité prudentielle ?',
      a: 'Le Conseil d\'Administration définit l\'appétence pour le risque, valide les politiques prudentielles et supervise le dispositif de gouvernance. Il doit s\'assurer de la mise en place des comités spécialisés (audit, risques, ALM, crédit), de l\'indépendance de la fonction de contrôle interne, et de la qualité du reporting aux superviseurs. La responsabilité des administrateurs est engagée en cas de défaillance de gouvernance avérée.',
    },
    {
      q: 'Quelles sont les catégories de SFD selon l\'Instruction BCEAO n°005-06-2010 et quelles obligations s\'appliquent à chacune ?',
      a: 'L\'Instruction n°010-08-2010 relative aux règles prudentielles des SFD de la BCEAO distingue 3 catégories de SFD : Catégorie 1 — les mutuelles et coopératives d\'épargne et de crédit (MUFEC), soumises aux obligations prudentielles standards et au contrôle de la Commission Bancaire ; Catégorie 2 — les associations et sociétés à capital variable ayant un encours de crédit supérieur à 2 milliards de FCFA, soumises à des obligations renforcées et à un commissariat aux comptes obligatoire ; Catégorie 3 — les grands réseaux de microfinance à dimension régionale, soumis aux exigences les plus contraignantes en termes de capital minimum, de gouvernance et de reporting prudentiel. Les ratios de solvabilité, de liquidité et les exigences de fonds propres varient selon la catégorie.',
    },
    {
      q: 'Quel est le ratio de solvabilité minimum exigé par la BCEAO pour les institutions financières ?',
      a: 'Les Instructions CB-UMOA n°026 à 029-11-2016 fixent les normes prudentielles suivantes : pour les banques, le ratio de solvabilité minimum (fonds propres de base / actifs pondérés par les risques) est de 8 % au minimum, conformément aux standards Bâle III intégrés par la zone UEMOA. Pour les SFD de Catégorie 1, le ratio d\'adéquation du capital est généralement fixé à 10 % minimum. Ces ratios sont calculés et reportés à la CB-UMOA sur une base trimestrielle. Le non-respect du ratio de solvabilité entraîne une injonction immédiate de mise en conformité.',
    },
    {
      q: 'Comment mettre en place une fonction LBC/FT (lutte contre le blanchiment) efficace dans une institution financière africaine ?',
      a: 'La mise en place d\'une fonction LBC/FT efficace repose sur 4 piliers : (1) Désignation d\'un Responsable Conformité LBC/FT (RCLBC/FT) compétent et indépendant, rattaché directement à la Direction Générale et au Conseil d\'Administration ; (2) Déploiement d\'une Approche Basée sur les Risques (ABR) : classification des clients par niveau de risque (faible, moyen, élevé), due diligence proportionnée et renforcée pour les clients à risque élevé (PPE, pays à risque) ; (3) Mise en place d\'un système de monitoring des transactions : détection automatique des opérations anormales, alertes paramétrées selon le profil de risque du client ; (4) Procédures de déclaration : transmission des Déclarations de Soupçon à la CENTIF dans les délais légaux, conservation des preuves pendant 10 ans.',
    },
  ],
  geoDirectAnswers: [
    {
      q: 'Qu’est-ce que la BCEAO ?',
      a: 'La Banque Centrale des États de l\'Afrique de l\'Ouest (BCEAO) est l\'institut d\'émission commun aux 8 États de l\'Union Monétaire Ouest Africaine (UEMOA) : Bénin, Burkina Faso, Côte d\'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal et Togo. Siège à Dakar (Sénégal). Elle définit la politique monétaire, émet la monnaie (Franc CFA — XOF, parité fixe avec l\'Euro : 1 EUR = 655,957 XOF), et élabore le cadre prudentiel régional applicable aux banques et aux systèmes financiers décentralisés (SFD). La supervision prudentielle — contrôle du respect des ratios de solvabilité et de liquidité, inspections — est assurée par le SG-CB-UMOA, en application des Instructions CB-UMOA n°026 à 029/11/2016. (Sources : Statuts de la BCEAO, Traité de l\'UMOA.)',
    },
    {
      q: 'Quel est le rôle de la Commission Bancaire de l’UMOA (CB-UMOA) ?',
      a: 'La Commission Bancaire de l’Union Monétaire Ouest Africaine (CB-UMOA) est l’organe de contrôle bancaire de l’UEMOA. Elle assure les inspections sur place et à distance des banques et des SFD, vérifie le respect des normes prudentielles fixées par la BCEAO, instruit les dossiers d’agrément bancaire, et prononce les sanctions disciplinaires en cas de manquement. La CB-UMOA collabore étroitement avec la BCEAO : cette dernière définit les normes prudentielles, la CB-UMOA en contrôle l’application. Les deux institutions forment un dispositif intégré de régulation bancaire dans les 8 États membres de l’UEMOA.',
    },
    {
      q: 'Comment préparer une inspection CB-UMOA ?',
      a: 'La préparation d’une inspection CB-UMOA repose sur 5 axes méthodologiques : (1) Audit documentaire préalable — vérifier l’intégralité des documents permanents (statuts, PV CA, manuels de procédures, politique LBC/FT, cartographie des risques) ; (2) Revue des ratios prudentiels — s’assurer du respect des seuils BCEAO sur les 12 derniers mois et documenter tout dépassement ; (3) Vérification du dispositif LBC/FT — conformité à la Directive UEMOA n°02/2015 (KYC, CDD, déclarations de soupçon CENTIF, formation du personnel) ; (4) Audit gouvernance — conformité aux Circulaires CB-UMOA 01-02-03/2017 (composition CA, comités spécialisés, PV, dirigeants effectifs) ; (5) Simulation d’inspection — réaliser un audit blanc avec restitution au Conseil d’Administration. KHEPRA EXPERTS recommande un délai de préparation de 6 à 8 semaines.',
    },
    {
      q: 'Quels sont les ratios prudentiels en zone UEMOA ?',
      a: 'Les principaux ratios prudentiels fixés par la BCEAO et contrôlés par la CB-UMOA pour les établissements de crédit en UEMOA sont : (1) Ratio de solvabilité global — fonds propres totaux / actifs pondérés par les risques, minimum 8 % (seuil pouvant être relevé pour les établissements systémiques, Instructions CB-UMOA n°026-029/11-2016) ; (2) Ratio de liquidité (LCR) — actifs liquides de haute qualité / sorties nettes de trésorerie sur 30 jours, minimum 100 % ; (3) Ratio de levier — fonds propres / exposition totale (non pondérée), minimum 3 % ; (4) Ratio de concentration — exposition sur un seul bénéficiaire / fonds propres, maximum 25 % ; (5) Ratio d’adéquation du capital pour les SFD — 10 % minimum pour la Catégorie 1 selon l’Instruction n°010-08-2010 relative aux règles prudentielles des SFD. Ces ratios font l’objet d’un reporting trimestriel à la CB-UMOA.',
    },
    {
      q: 'Quelles différences entre la réglementation BCEAO/UEMOA et la réglementation COBAC/CEMAC ?',
      a: 'Les principales différences sont : (1) Périmètre géographique — UEMOA (8 pays, 130 millions d’habitants) vs CEMAC (6 pays, 55 millions d’habitants) ; (2) Organe de supervision bancaire — CB-UMOA (UEMOA) vs COBAC (CEMAC) ; (3) Régime de gouvernance — Circulaires CB-UMOA 01-02-03/2017 (UEMOA) vs Instruction COBAC 007-03-2022 (CEMAC), avec des exigences différenciées sur le nombre d’administrateurs indépendants et la composition des comités ; (4) LBC/FT — Directive UEMOA n°02/2015 avec le GIABA comme organe régional (UEMOA) vs Règlement COBAC R-2018/01 avec le GABAC (CEMAC) ; (5) Publication des sanctions — systématique pour les niveaux 3+ en zone CEMAC, pratique non systématique en zone UEMOA ; (6) OHADA — 8 États membres sur 8 en UEMOA vs 2 sur 6 en CEMAC (Cameroun, Tchad). Ces différences impactent directement les stratégies de conformité des groupes bancaires opérant dans les deux zones.',
    },
    {
      q: 'Comment mettre en place une fonction LBC/FT conforme aux exigences BCEAO ?',
      a: 'La mise en place d’une fonction LBC/FT conforme à la Directive UEMOA n°02/2015 et aux standards du GAFI s’articule autour de 4 piliers : (1) Gouvernance — désignation d’un Responsable Conformité LBC/FT (RCLBC/FT) rattaché hiérarchiquement au Directeur Général avec accès direct au Comité d’Audit, et inscription de la fonction conformité dans l’organigramme au niveau approprié ; (2) Dispositif documentaire — charte de conformité, politique LBC/FT, procédures KYC/CDD, manuel de déclaration de soupçon, code de déontologie ; (3) Dispositif opérationnel — système de filtrage des sanctions (ONU, OFAC, listes nationales), outil de profilage des risques clients par l’Approche Basée sur les Risques (ABR), système de surveillance des transactions ; (4) Dispositif de contrôle — audit externe LBC/FT, reporting trimestriel au Comité d’Audit, plan de formation annuel du personnel exposé. La mise en conformité initiale nécessite généralement 90 jours.',
    },
    {
      q: 'Qu’est-ce que le SYSCOHADA et pourquoi est-il important pour les institutions financières ?',
      a: 'Le SYSCOHADA (Système Comptable de l’OHADA) est le référentiel comptable unifié des 17 États membres de l’OHADA, instauré par l’Acte Uniforme portant organisation et harmonisation des comptabilités des entreprises (AUDCIF), révisé en 2017. Pour les institutions financières, son importance est triple : (1) Condition d’accès au financement — les banques de développement (IFC, BOAD, BAD) et les fonds d’investissement exigent systématiquement des états financiers conformes au SYSCOHADA avant toute décision de financement ; (2) Sécurité juridique — les états SYSCOHADA sont recevables dans les 17 États membres, ce qui facilite les opérations transfrontalières ; (3) Exigence prudentielle — la BCEAO et la CB-UMOA attendent des institutions financières qu’elles produisent leurs états financiers selon un référentiel comptable reconnu. Les états non conformes sont fréquemment rejetés par les superviseurs et les partenaires financiers.',
    },
  ],
  distinctionObligation: {
    heading: 'Obligations Réglementaires vs Recommandations — Distinction essentielle',
    intro: 'Le tableau ci-dessous distingue clairement les exigences réglementaires obligatoires (dont le non-respect expose l’institution à des sanctions BCEAO/CB-UMOA) des recommandations de bonnes pratiques et des standards internationaux. Cette distinction est fondamentale pour la priorisation des actions de mise en conformité.',
    categories: [
      {
        type: 'obligation',
        label: 'OBLIGATION RÉGLEMENTAIRE',
        description: 'Exigence prévue par un texte officiel en vigueur (Instructions BCEAO, Circulaires CB-UMOA, Directive UEMOA, Actes Uniformes OHADA). Le non-respect expose l’institution à des sanctions disciplinaires (avertissement, injonction, limitation d’activité, sanction pécuniaire, administration provisoire, retrait d’agrément).',
        icon: 'ri-shield-check-line',
        items: [
          { text: 'Respect des ratios prudentiels (solvabilité ≥ 8 %, liquidité ≥ 100 %, levier, concentration)', reference: 'Instructions CB-UMOA n°026 à 029/11/2016' },
          { text: 'Obligations de vigilance à l’égard de la clientèle (KYC, CDD, EDD, PPE)', reference: 'Directive UEMOA n°02/2015, art. 5-22' },
          { text: 'Déclaration de soupçon à la CENTIF nationale', reference: 'Directive UEMOA n°02/2015, art. 28-30' },
          { text: 'Désignation d’un Responsable Conformité LBC/FT (RCLBC/FT)', reference: 'Directive UEMOA n°02/2015' },
          { text: 'Classification des SFD selon l’Instruction n°010-08-2010 relative aux règles prudentielles des SFD', reference: 'Instruction BCEAO n°005-06-2010' },
          { text: 'Conservation des documents relatifs à la LBC/FT pendant au moins 10 ans', reference: 'Directive UEMOA n°02/2015, art. 18' },
          { text: 'Formation obligatoire du personnel exposé au risque LBC/FT', reference: 'Directive UEMOA n°02/2015, art. 47' },
          { text: 'Production d’états financiers conformes au SYSCOHADA', reference: 'Acte Uniforme OHADA AUDCIF révisé 2017' },
        ],
      },
      {
        type: 'bonne-pratique',
        label: 'BONNE PRATIQUE PRUDENTIELLE',
        description: 'Pratique recommandée par les standards internationaux (Bâle, GAFI, OCDE) ou par les retours d’expérience de supervision, sans caractère obligatoire dans les textes UEMOA actuels. Contribue significativement à la qualité du dispositif de conformité et facilite le dialogue avec le superviseur.',
        icon: 'ri-thumb-up-line',
        items: [
          { text: 'Audit externe LBC/FT annuel (au-delà de la périodicité réglementaire minimale)', reference: 'Recommandation KHEPRA basée sur les standards GAFI' },
          { text: 'Publication volontaire d’un rapport de conformité et de gouvernance', reference: 'Recommandation KHEPRA alignée sur les standards OCDE' },
          { text: 'Mise en place d’un Comité Éthique ou RSE au niveau du Conseil d’Administration', reference: 'Recommandation KHEPRA — bonne pratique internationale' },
          { text: 'Stress tests de liquidité trimestriels (au-delà de la fréquence réglementaire)', reference: 'Recommandation KHEPRA basée sur les bonnes pratiques Bâle III' },
          { text: 'Formation annuelle du Conseil d’Administration aux spécificités UEMOA', reference: 'Recommandation KHEPRA — retour d’expérience terrain' },
        ],
      },
      {
        type: 'standard',
        label: 'STANDARD INTERNATIONAL DE RÉFÉRENCE',
        description: 'Standard émis par une organisation internationale (BCBS, GAFI, OCDE, IFRS Foundation) dont la transposition intégrale dans le droit UEMOA est partielle ou progressive. Constitue une référence de marché que les investisseurs et les banques correspondantes attendent.',
        icon: 'ri-global-line',
        items: [
          { text: 'Bâle III — Pilier 2 (ICAAP) et Pilier 3 (discipline de marché)', reference: 'BCBS — Bâle III framework' },
          { text: 'IFRS 9 — Dépréciation des actifs financiers selon le modèle ECL', reference: 'IASB — IFRS 9 Instruments Financiers' },
          { text: 'GAFI — Approche Basée sur les Risques (ABR) intégrale (Recommandation 1)', reference: 'GAFI — Recommandation 1 et guide ABR' },
          { text: 'OCDE — Principes de Gouvernance d’Entreprise (publication intégrale)', reference: 'OCDE — G20/OECD Principles of Corporate Governance 2023' },
          { text: 'COSO — Cadre intégré de contrôle interne (2013/2017)', reference: 'COSO — Internal Control — Integrated Framework' },
        ],
      },
    ],
  },
  avertissement: {
    heading: 'Avertissement Juridique',
    paragraphs: [
      'Le présent article constitue une analyse informative et pédagogique fondée sur les textes officiels en vigueur à la date de sa dernière mise à jour (20 juin 2026). Il est destiné à fournir un éclairage général sur le cadre réglementaire applicable aux institutions financières en zone UEMOA.',
      'Il ne saurait se substituer à un avis juridique, réglementaire ou prudentiel spécifique. Les textes cités peuvent faire l’objet de modifications, d’abrogations ou de révisions postérieures à la date de publication. Les seuils, délais et montants mentionnés le sont à titre indicatif sur la base des textes en vigueur à la date indiquée.',
      'Les institutions financières concernées doivent impérativement consulter les textes officiels applicables dans leur version la plus récente, disponibles auprès des autorités compétentes (BCEAO, CB-UMOA, CENTIF nationale, OHADA), et, le cas échéant, solliciter un accompagnement spécialisé pour l’évaluation de leur situation particulière.',
      'KHEPRA EXPERTS décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations contenues dans cet article en l’absence d’une consultation professionnelle adaptée à la situation spécifique de l’institution concernée.',
    ],
  },
};

export const articleEN: ArticleData = {
  title: 'BCEAO and OHADA Compliance: Regulatory Framework, Prudential Obligations and Governance for Financial Institutions in West Africa',
  excerpt: 'Mastery of the BCEAO regulatory framework and OHADA law is a governance imperative for financial institutions, electronic money issuers and businesses operating in the WAEMU zone. Beyond formal compliance, it conditions access to financing, operational sustainability and institutional credibility.',
  readTime: '14 min read',
  publishedDate: 'May 11, 2026',
  modifiedDate: 'June 20, 2026',
  author: 'SIMDA Essoyomèwè',
  authorTitle: 'Associate Director & Founder, KHEPRA EXPERTS',
  methodologyNote: 'This article was produced using the KHEPRA EXPERTS regulatory review methodology: analysis of official texts in force (BCEAO Instructions, CB-UMOA Circulars, UEMOA Directive No. 02/2015, OHADA Uniform Acts, FATF/Basel standards), cross-referenced with field observations from audit and compliance missions in the WAEMU zone, and reviewed by a Senior Partner. Last updated: June 20, 2026.',
  category: 'Compliance & Regulation',
  tags: ['BCEAO', 'OHADA', 'Compliance', 'Financial Institutions', 'Prudential', 'AML/CFT', 'KYC', 'Governance'],
  heroAlt: 'BCEAO OHADA Compliance West Africa — KHEPRA EXPERTS',
  metaDescription: 'BCEAO regulatory framework and OHADA law: prudential obligations, AML/CFT, KYC, cybersecurity, governance and digital compliance for financial institutions in the WAEMU zone.',
  metaKeywords: 'BCEAO compliance, OHADA compliance, microfinance regulations Africa, financial audit UEMOA, AML/CFT BCEAO, KYC microfinance, prudential governance',
  sections: [
    {
      id: 'introduction',
      heading: 'Introduction: Compliance as a Foundation of Institutional Credibility',
      content: (
        <div className="space-y-4">
          <p>
            In the WAEMU zone, compliance with the requirements of the <strong>Central Bank of West African States (BCEAO)</strong> and <strong>OHADA</strong> law constitutes a pillar of governance for financial institutions and businesses. It extends beyond a legal obligation: it structures the relationship of trust with supervisors, financial partners and clients.
          </p>
          <p>
            The BCEAO develops the <strong>prudential regulatory framework</strong> applicable to banks, decentralized financial systems (SFD), electronic money issuers and other financial institutions in the eight WAEMU member states. <strong>Prudential supervision</strong> — on-site and off-site control, inspections, sanctions — is the responsibility of the <strong>Secretariat General of the Banking Commission of the West African Monetary Union (SG-CB-UMOA)</strong>, in application of Instructions No. 026 to 029/11/2016.
          </p>
          <p>
            <strong>OHADA</strong> law (Organization for the Harmonization of Business Law in Africa) unifies the legal framework for commercial activities across its 17 member states. For zone businesses, OHADA compliance ensures the legal security of contracts, the validity of bylaws and accounting transparency through the <strong>SYSCOHADA</strong> framework.
          </p>
          <p>
            This article presents in a structured manner the applicable regulatory obligations, the risks of non-compliance and governance best practices, aimed at executives, board members and compliance officers of African financial institutions.
          </p>
        </div>
      ),
    },
    {
      id: 'bceao-cadre',
      heading: 'BCEAO Prudential Framework: Reference Texts and Obligations of Financial Institutions',
      content: (
        <div className="space-y-4">
          <p>
            BCEAO prudential regulation is structured around several fundamental texts, supplemented by CB-UMOA Instructions. Institutions must master their operational scope.
          </p>
          <ul className="space-y-3 pl-4">
            {[
              { t: 'Instruction No. 005-06-2010 on SFD', d: 'Framework for licensing, organization and prudential supervision of decentralized financial systems. Sets liquidity ratios, capital requirements and governance rules applicable to SFD categories 1, 2 and 3.' },
              { t: 'Instructions No. 026 to 029/11/2016 (CB-UMOA)', d: 'Prudential standards applicable to banks and SFD: solvency ratio (adapted Cooke), liquidity ratio, risk diversification, provisions for doubtful claims, and reporting requirements to the Banking Commission.' },
              { t: 'Instruction on electronic money', d: 'The BCEAO regulates electronic money issuance through minimum capital requirements, client fund segregation and periodic reporting. Issuers must comply with specific governance standards.' },
              { t: 'WAEMU Directive No. 02/2015 on AML/CFT', d: 'Regional framework for combating money laundering and terrorist financing. Requires financial institutions to implement a Risk-Based Approach (RBA), KYC procedures and a suspicious transaction reporting system.' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-arrow-right-s-line text-xs" style={{ color: '#c9a227' }} />
                </div>
                <div><strong>{item.t}:</strong> {item.d}</div>
              </li>
            ))}
          </ul>
          <div className="p-5 rounded-xl border-l-4" style={{ background: '#fffbeb', borderColor: '#c9a227' }}>
            <p className="font-semibold text-gray-800 mb-1">Institutional precision</p>
            <p className="text-gray-700 text-sm leading-relaxed">The BCEAO defines monetary policy and the regional prudential framework. The CB-UMOA ensures on-site and off-site control of institutions. Both entities collaborate in monitoring ratios and managing crises. A financial institution is required to respond to both levels of supervision.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'aml-cft-kyc',
      heading: 'AML/CFT and KYC: Regulatory Obligations and Operational Implementation',
      content: (
        <div className="space-y-4">
          <p>
            <strong>WAEMU Directive No. 02/2015</strong> transposes <strong>FATF</strong> and <strong>GIABA</strong> (Inter-Governmental Action Group against Money Laundering in West Africa) standards into the WAEMU zone. Every financial institution, including SFD and electronic money issuers, is subject to these requirements.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Risk-Based Approach (RBA)', desc: 'The institution must evaluate its exposure to money laundering risk across four dimensions: clients, products and services, distribution channels, and geographic areas. Due diligence measures must be proportionate to the identified risk level.', color: '#c9a227' },
              { title: 'Know Your Customer (KYC)', desc: 'Identification and verification of every client\'s identity. Updating data when changes occur. Retention of supporting documents for a minimum of ten years, in accordance with traceability requirements.', color: '#22a05a' },
              { title: 'Suspicious transaction reporting', desc: 'Any suspicious operation must be reported to the National Financial Intelligence Processing Unit (CENTIF) of the relevant country, within a timeframe compatible with Directive No. 02/2015 requirements.', color: '#c9a227' },
              { title: 'AML/CFT Compliance Officer (RCLBC/FT)', desc: 'Designation of a dedicated officer, trained in AML/CFT requirements, functionally reporting to the CEO and Board of Directors. This role is verified during BCEAO and CB-UMOA inspections.', color: '#22a05a' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                <h4 className="font-bold text-gray-900 text-sm mb-2" style={{ color: item.color }}>{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            AML/CFT non-compliance exposes the institution to regulatory sanctions (injunction, licensing restriction, license revocation) and to criminal penalties for responsible executives, in accordance with national transposition texts of WAEMU Directive No. 02/2015.
          </p>
        </div>
      ),
    },
    {
      id: 'cybersecurite-donnees',
      heading: 'Cybersecurity, Digital Fraud and Client Data Protection',
      content: (
        <div className="space-y-4">
          <p>
            The digitalization of financial services in the WAEMU zone amplifies cyber risks. The BCEAO expects electronic money issuers and financial institutions to integrate <strong>cybersecurity</strong> into their risk governance framework.
          </p>
          <div className="space-y-3">
            {[
              { title: 'Information systems security', desc: 'Implementation of IT security policies, access controls, encryption of sensitive data, and business continuity plans. Security incidents must be documented and, depending on severity, reported to supervisors.', color: '#ef4444' },
              { title: 'Digital and transactional fraud', desc: 'Deployment of abnormal transaction detection systems, strong client authentication (MFA), and monitoring of new fraud modalities (phishing, identity theft, terminal compromise).', color: '#f59e0b' },
              { title: 'Personal data protection', desc: 'Compliance with national data protection frameworks (personal data protection laws in each member state) and regional best practices. Client consent, collection limitation, and right of access.', color: '#22a05a' },
              { title: 'Cloud compliance and traceability', desc: 'In case of cloud hosting, the institution must guarantee data localization in accordance with national requirements, ensure access traceability, and retain audit logs for prudential inspection purposes.', color: '#c9a227' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: item.color }} />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'gouvernance-reclamations',
      heading: 'Complaints Governance, Internal Control and Board Responsibility',
      content: (
        <div className="space-y-4">
          <p>
            Governance of financial institutions in the WAEMU zone rests on a three-lines-of-defense architecture, framed by CB-UMOA Instructions and BCEAO standards.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: 'ri-shield-check-line', title: 'Internal control', desc: 'Establishment of an independent internal control function, an updated risk mapping, and an annual internal audit plan. Internal control covers operational, financial, compliance and reputational risks.', color: '#22a05a' },
              { icon: 'ri-user-voice-line', title: 'Complaints governance', desc: 'Formalized procedure for receiving, recording, processing and responding to client complaints. Defined response timelines, up-to-date complaints register, and escalation to institutional mediation when necessary.', color: '#c9a227' },
              { icon: 'ri-team-line', title: 'Board of Directors responsibility', desc: 'The Board defines risk appetite, validates prudential policies, and oversees the governance framework. Specialized committees (audit, risks, ALM, credit) ensure technical risk management.', color: '#22a05a' },
              { icon: 'ri-file-search-line', title: 'Auditability and supervision', desc: 'The institution must allow periodic audit of its client protection mechanism by internal and external auditors. Decision traceability, document retention and data access are inspection requirements.', color: '#c9a227' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg mb-3" style={{ background: `${item.color}15` }}>
                  <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border-l-4" style={{ background: '#f0fdf4', borderColor: '#22a05a' }}>
            <p className="font-semibold text-gray-800 mb-2">Governance best practices</p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li className="flex items-start gap-2"><span style={{ color: '#22a05a' }}>•</span>Board meetings at least quarterly, with formalized minutes</li>
              <li className="flex items-start gap-2"><span style={{ color: '#22a05a' }}>•</span>ALM Committee meetings quarterly for institutions collecting public deposits</li>
              <li className="flex items-start gap-2"><span style={{ color: '#22a05a' }}>•</span>Annual internal audit report transmitted to the Board and supervisors</li>
              <li className="flex items-start gap-2"><span style={{ color: '#22a05a' }}>•</span>Annual review of risk mapping and remediation plans</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'ohada-entreprises',
      heading: 'OHADA: Legal Security, SYSCOHADA Accounting and Cross-Border Operations',
      content: (
        <div className="space-y-4">
          <p>
            OHADA law covers a broad spectrum of commercial activities through its <strong>Uniform Acts</strong>. For zone businesses, OHADA compliance offers structural advantages, particularly in legal security and accounting transparency.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: 'ri-shield-check-line', title: 'Legal security of contracts', desc: 'Contracts drafted in accordance with OHADA Uniform Acts are valid and enforceable in all 17 member states. This uniformity reduces legal uncertainties in cross-border operations.', color: '#22a05a' },
              { icon: 'ri-bank-line', title: 'Access to financing', desc: 'Credit institutions and investment funds frequently condition their financing decisions on the compliance of bylaws, financial statements and contracts with OHADA law and SYSCOHADA.', color: '#c9a227' },
              { icon: 'ri-expand-right-line', title: 'Regional expansion', desc: 'Operate in all 17 OHADA countries under a harmonized legal framework: Côte d\'Ivoire, Senegal, Cameroon, Gabon, Chad, Equatorial Guinea, Congo, CAR, Comoros, Togo, Benin, Burkina Faso, Mali, Niger, Guinea-Bissau, DRC, Chad.', color: '#22a05a' },
              { icon: 'ri-user-star-line', title: 'Institutional attractiveness', desc: 'OHADA compliance is an indicator of seriousness and governance for international financial partners, donors and impact funds.', color: '#c9a227' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg mb-3" style={{ background: `${item.color}15` }}>
                  <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            The <strong>Uniform Act on the Organization and Harmonization of Business Accounting (AUDCIF)</strong>, revised in 2017, mandates the SYSCOHADA framework. Financial statements (balance sheet, income statement, cash flow statement, notes) must be produced in accordance with this framework to be acceptable to supervisors and financial partners.
          </p>
        </div>
      ),
    },
    {
      id: 'enjeux-pme',
      heading: 'Non-Compliance Risks: Regulatory Sanctions and Operational Consequences',
      content: (
        <div className="space-y-4">
          <p>
            Non-compliance with BCEAO, CB-UMOA or OHADA requirements exposes institutions and businesses to a range of sanctions and consequences, some of which may compromise their sustainability.
          </p>
          <div className="space-y-4">
            {[
              { title: 'Regulatory sanctions and license revocation', desc: 'The BCEAO and CB-UMOA have measures ranging from compliance injunctions to provisional administration, and up to license revocation for the most serious cases of persistent non-compliance.', icon: 'ri-error-warning-line', color: '#ef4444' },
              { title: 'Blocked access to financing', desc: 'Credit institutions, development banks and investment funds generally require a complete compliance file before any financing decision. An incomplete or non-SYSCOHADA-compliant file is frequently rejected.', icon: 'ri-lock-line', color: '#f59e0b' },
              { title: 'Legal risks and litigation', desc: 'Poorly drafted contracts, bylaws not compliant with the Uniform Act on Commercial Companies and Economic Interest Groups, or deficient governance expose the company to shareholder litigation and contractual nullity risks.', icon: 'ri-scales-3-line', color: '#f59e0b' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-red-50 border border-red-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${item.color}15` }}>
                  <i className={`${item.icon} text-xl`} style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'strategie-conformite',
      heading: 'Building a Structured and Sustainable Compliance Framework',
      content: (
        <div className="space-y-4">
          <p>
            Compliance should not be approached as a one-time exercise but as a <strong>continuous and structured process</strong>. Financial institutions must integrate compliance into their governance and daily management.
          </p>
          <div className="space-y-4">
            {[
              { num: '01', title: 'Compliance diagnosis', desc: 'Comprehensive assessment of gaps between the current situation and applicable BCEAO, CB-UMOA and OHADA requirements. Mapping of regulatory, AML/CFT, cybersecurity and governance risks. Prioritization of corrective actions by criticality level.', color: '#c9a227' },
              { num: '02', title: 'Compliance action plan', desc: 'Development of a detailed action plan with clear milestones, designated owners and allocated budget. The plan covers procedure documentation, internal control strengthening, team training, and updating of AML/CFT and KYC policies.', color: '#22a05a' },
              { num: '03', title: 'Implementation and documentation', desc: 'Drafting or revision of procedure manuals, updating bylaws, strengthening the internal control function, establishing the complaints governance mechanism, and training teams on regulatory requirements.', color: '#c9a227' },
              { num: '04', title: 'Monitoring and periodic review', desc: 'Permanent regulatory watch, periodic compliance reviews, annual internal audits of the client protection mechanism, and adaptation to changes in BCEAO, CB-UMOA and OHADA texts.', color: '#22a05a' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-xl bg-white border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 font-playfair font-bold text-lg" style={{ background: `${step.color}12`, color: step.color }}>
                  {step.num}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'conseil-stratégique-levee',
      heading: 'Compliance and Access to Financing: A Structural Link',
      content: (
        <div className="space-y-4">
          <p>
            BCEAO/OHADA compliance is a <strong>determining factor</strong> in financing decisions in West Africa. Whether for an impact fund, a development bank or a private investor, the quality of the compliance file significantly influences risk assessment and commitment decisions.
          </p>
          <p>
            International investors (IFC, BOAD, AfDB, impact funds) frequently condition their financing on prudential compliance and governance quality. A solid ESG file rests on a documented, auditable compliance mechanism aligned with regulatory standards.
          </p>
          <p>
            At KHEPRA EXPERTS, we support organizations through this structured process, integrating{' '}
            <Link to="/services/conseil-strategique/" className="font-semibold underline" style={{ color: '#c9a227' }}>
              strategic advisory
            </Link>{' '}
            and{' '}
            <Link to="/services/levee-de-fonds/" className="font-semibold underline" style={{ color: '#22a05a' }}>
              fundraising
            </Link>{' '}
            : we first secure the regulatory compliance framework, then structure the investment file to meet financial partner requirements.
          </p>
          <div className="p-6 rounded-2xl" style={{ background: '#0a0a0a' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ background: '#c9a227' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#c9a227' }}>Our Integrated Approach</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: 'ri-shield-check-line', title: 'Phase 1: Compliance & Governance', items: ['BCEAO/CB-UMOA/OHADA compliance audit', 'Regulatory risk mapping', 'AML/CFT/KYC compliance plan', 'Internal control and committees setup'], color: '#c9a227' },
                { icon: 'ri-funds-line', title: 'Phase 2: File Structuring', items: ['SYSCOHADA-compliant business plan', 'Preparatory due diligence', 'ESG and governance documentation', 'Investor introductions'], color: '#22a05a' },
              ].map((phase, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-3">
                    <i className={`${phase.icon} text-lg`} style={{ color: phase.color }} />
                    <span className="text-sm font-bold text-white">{phase.title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: `${phase.color}20` }}>
                          <i className="ri-check-line text-xs" style={{ color: phase.color }} />
                        </div>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'conclusion',
      heading: 'Conclusion: Compliance as a Foundation of Sustainability',
      content: (
        <div className="space-y-4">
          <p>
            BCEAO/OHADA compliance is a <strong>foundation of sustainability</strong> for financial institutions and businesses operating in West Africa. It structures the relationship with supervisors, secures operations and strengthens credibility with financial partners.
          </p>
          <p>
            Institutions that invest in a comprehensive compliance framework — covering prudential ratios, AML/CFT, KYC, cybersecurity, data protection, complaints governance and internal control — benefit from a robust governance framework, recognized by supervisors and international investors.
          </p>
          <p>
            At KHEPRA EXPERTS, we support financial institutions and businesses in structuring and strengthening their compliance framework, in the WAEMU and CEMAC zones, with an approach based on official regulatory texts and prudential best practices.
          </p>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: 'What is the difference between the BCEAO and the CB-UMOA?',
      a: 'The BCEAO is the central bank of the WAEMU. It defines monetary policy and develops the regional prudential framework for the 8 member states. Prudential supervision — on-site and off-site inspections, ratio monitoring, corrective measures — is the responsibility of the Banking Commission of the West African Monetary Union (CB-UMOA) and its Secretariat General (SG-CB-UMOA). Both institutions collaborate in monitoring ratios and managing crises.',
    },
    {
      q: 'Which regulatory texts govern SFD compliance in the WAEMU zone?',
      a: 'The main texts are: BCEAO Instruction No. 010-08-2010 on SFD prudential rules on SFD licensing and supervision conditions; CB-UMOA Instructions No. 026 to 029/11-2016 setting prudential standards (solvency, liquidity, risk diversification); and WAEMU Directive No. 02/2015 on combating money laundering and terrorist financing.',
    },
    {
      q: 'Is OHADA compliance required to access financing?',
      a: 'In practice, credit institutions, development banks and investment funds frequently require OHADA compliance as a prerequisite for examining a financing file. Bylaws must comply with the Uniform Act on Commercial Companies and Economic Interest Groups, and financial statements must follow the SYSCOHADA framework. This requirement is not automatic in all cases, but it is a widely accepted reference standard.',
    },
    {
      q: 'What role does the Board of Directors play in prudential compliance?',
      a: 'The Board of Directors defines risk appetite, validates prudential policies and oversees the governance framework. It must ensure the establishment of specialized committees (audit, risks, ALM, credit), the independence of the internal control function, and the quality of reporting to supervisors.',
    },
  ],
  geoDirectAnswers: [
    {
      q: 'What is the BCEAO?',
      a: 'The Central Bank of West African States (BCEAO) is the common issuing institute of the 8 WAEMU member states: Benin, Burkina Faso, Cote d Ivoire, Guinea-Bissau, Mali, Niger, Senegal and Togo. Headquartered in Dakar (Senegal). It defines monetary policy, issues currency (CFA Franc - XOF, fixed parity with the Euro: 1 EUR = 655.957 XOF), and develops the regional prudential framework applicable to banks and decentralized financial systems (SFD). Prudential supervision — monitoring of solvency and liquidity ratios, inspections — is carried out by the SG-CB-UMOA, pursuant to CB-UMOA Instructions No. 026 to 029/11/2016. (Sources: BCEAO Statutes, UMOA Treaty.)',
    },
    {
      q: 'What is the role of the WAEMU Banking Commission (CB-UMOA)?',
      a: 'The Banking Commission of the West African Monetary Union (CB-UMOA) is the banking supervisory body of the WAEMU. It conducts on-site and off-site inspections of banks and SFDs, verifies compliance with prudential standards set by the BCEAO, processes banking license applications, and issues disciplinary sanctions in the event of breaches. The CB-UMOA works closely with the BCEAO: the BCEAO defines prudential standards, the CB-UMOA monitors their application. Both institutions form an integrated banking regulatory framework across the 8 WAEMU member states.',
    },
    {
      q: 'How to prepare for a CB-UMOA inspection?',
      a: 'Preparing for a CB-UMOA inspection relies on 5 methodological axes: (1) Preliminary documentary audit - verify the completeness of permanent documents (bylaws, Board minutes, procedure manuals, AML/CFT policy, risk mapping); (2) Prudential ratio review - ensure compliance with BCEAO thresholds over the last 12 months and document any breaches; (3) AML/CFT framework verification - compliance with UEMOA Directive No. 02/2015 (KYC, CDD, suspicious transaction reports to CENTIF, staff training); (4) Governance audit - compliance with CB-UMOA Circulars 01-02-03/2017 (Board composition, specialized committees, minutes, effective directors); (5) Inspection simulation - conduct a mock audit with reporting to the Board. KHEPRA EXPERTS recommends a preparation timeline of 6 to 8 weeks.',
    },
    {
      q: 'What are the prudential ratios in the WAEMU zone?',
      a: 'The main prudential ratios set by the BCEAO and monitored by the CB-UMOA for credit institutions in the WAEMU are: (1) Overall solvency ratio - total own funds / risk-weighted assets, minimum 8% (threshold may be raised for systemic institutions, CB-UMOA Instructions No. 026-029/11-2016); (2) Liquidity Coverage Ratio (LCR) - high-quality liquid assets / net cash outflows over 30 days, minimum 100%; (3) Leverage ratio - own funds / total exposure (unweighted), minimum 3%; (4) Concentration ratio - exposure to a single beneficiary / own funds, maximum 25%; (5) Capital adequacy ratio for SFDs - 10% minimum for Category 1 under Instruction No. 005-06-2010. These ratios are reported quarterly to the CB-UMOA.',
    },
    {
      q: 'What are the differences between BCEAO/WAEMU and COBAC/CEMAC regulations?',
      a: 'The main differences are: (1) Geographic scope - WAEMU (8 countries, 130 million inhabitants) vs CEMAC (6 countries, 55 million inhabitants); (2) Banking supervisory body - CB-UMOA (WAEMU) vs COBAC (CEMAC); (3) Governance regime - CB-UMOA Circulars 01-02-03/2017 (WAEMU) vs COBAC Instruction 007-03-2022 (CEMAC), with differentiated requirements on the number of independent directors and committee composition; (4) AML/CFT - UEMOA Directive No. 02/2015 with GIABA as the regional body (WAEMU) vs COBAC Regulation R-2018/01 with GABAC (CEMAC); (5) Sanctions publication - systematic for levels 3+ in the CEMAC zone, non-systematic practice in the WAEMU zone; (6) OHADA - 8 out of 8 WAEMU member states vs 2 out of 6 CEMAC states (Cameroon, Chad). These differences directly impact the compliance strategies of banking groups operating in both zones.',
    },
    {
      q: 'How to implement an effective AML/CFT function compliant with BCEAO requirements?',
      a: 'Implementing an AML/CFT function compliant with UEMOA Directive No. 02/2015 and FATF standards relies on 4 pillars: (1) Governance - designation of an AML/CFT Compliance Officer (RCLBC/FT) reporting directly to the CEO with direct access to the Audit Committee, and placement of the compliance function at the appropriate level in the organizational chart; (2) Documentary framework - compliance charter, AML/CFT policy, KYC/CDD procedures, suspicious transaction reporting manual, code of conduct; (3) Operational framework - sanctions screening system (UN, OFAC, national lists), client risk profiling tool using the Risk-Based Approach (RBA), transaction monitoring system; (4) Control framework - external AML/CFT audit, quarterly reporting to the Audit Committee, annual training plan for exposed staff. Initial compliance typically requires 90 days.',
    },
    {
      q: 'What is SYSCOHADA and why is it important for financial institutions?',
      a: 'SYSCOHADA (OHADA Accounting System) is the unified accounting framework of the 17 OHADA member states, established by the Uniform Act on the Organization and Harmonization of Business Accounting (AUDCIF), revised in 2017. For financial institutions, its importance is threefold: (1) Financing access condition - development banks (IFC, BOAD, AfDB) and investment funds systematically require SYSCOHADA-compliant financial statements before any financing decision; (2) Legal security - SYSCOHADA financial statements are admissible in all 17 member states, facilitating cross-border operations; (3) Prudential requirement - the BCEAO and CB-UMOA expect financial institutions to produce their financial statements under a recognized accounting framework. Non-compliant financial statements are frequently rejected by supervisors and financial partners.',
    },
  ],
  distinctionObligation: {
    heading: 'Regulatory Obligations vs Recommendations - Essential Distinction',
    intro: 'The table below clearly distinguishes mandatory regulatory requirements (failure to comply exposes the institution to BCEAO/CB-UMOA sanctions) from good practice recommendations and international standards. This distinction is fundamental for prioritizing compliance actions.',
    categories: [
      {
        type: 'obligation',
        label: 'REGULATORY OBLIGATION',
        description: 'Requirement set forth in an official text in force (BCEAO Instructions, CB-UMOA Circulars, UEMOA Directive, OHADA Uniform Acts). Non-compliance exposes the institution to disciplinary sanctions (warning, injunction, activity restriction, financial penalty, provisional administration, license revocation).',
        icon: 'ri-shield-check-line',
        items: [
          { text: 'Compliance with prudential ratios (solvency >= 8%, liquidity >= 100%, leverage, concentration)', reference: 'CB-UMOA Instructions No. 026 to 029/11/2016' },
          { text: 'Customer due diligence obligations (KYC, CDD, EDD, PEP)', reference: 'UEMOA Directive No. 02/2015, art. 5-22' },
          { text: 'Suspicious transaction reporting to the national CENTIF', reference: 'UEMOA Directive No. 02/2015, art. 28-30' },
          { text: 'Designation of an AML/CFT Compliance Officer (RCLBC/FT)', reference: 'UEMOA Directive No. 02/2015' },
          { text: 'SFD classification in accordance with Instruction No. 005-06-2010', reference: 'BCEAO Instruction No. 010-08-2010 on SFD prudential rules' },
          { text: 'Retention of AML/CFT documents for at least 10 years', reference: 'UEMOA Directive No. 02/2015, art. 18' },
          { text: 'Mandatory training of staff exposed to AML/CFT risk', reference: 'UEMOA Directive No. 02/2015, art. 47' },
          { text: 'Production of SYSCOHADA-compliant financial statements', reference: 'OHADA Uniform Act AUDCIF revised 2017' },
        ],
      },
      {
        type: 'bonne-pratique',
        label: 'PRUDENTIAL BEST PRACTICE',
        description: 'Practice recommended by international standards (Basel, FATF, OECD) or by supervisory feedback, without mandatory character in current WAEMU texts. Significantly contributes to the quality of the compliance framework and facilitates dialogue with the supervisor.',
        icon: 'ri-thumb-up-line',
        items: [
          { text: 'Annual external AML/CFT audit (beyond minimum regulatory frequency)', reference: 'KHEPRA recommendation based on FATF standards' },
          { text: 'Voluntary publication of a compliance and governance report', reference: 'KHEPRA recommendation aligned with OECD standards' },
          { text: 'Establishment of an Ethics or CSR Committee at Board level', reference: 'KHEPRA recommendation - international best practice' },
          { text: 'Quarterly liquidity stress tests (beyond regulatory frequency)', reference: 'KHEPRA recommendation based on Basel III best practices' },
          { text: 'Annual Board training on WAEMU specificities', reference: 'KHEPRA recommendation - field experience feedback' },
        ],
      },
      {
        type: 'standard',
        label: 'INTERNATIONAL REFERENCE STANDARD',
        description: 'Standard issued by an international organization (BCBS, FATF, OECD, IFRS Foundation) whose full transposition into WAEMU law is partial or progressive. Constitutes a market benchmark expected by investors and correspondent banks.',
        icon: 'ri-global-line',
        items: [
          { text: 'Basel III - Pillar 2 (ICAAP) and Pillar 3 (market discipline)', reference: 'BCBS - Basel III framework' },
          { text: 'IFRS 9 - Financial asset impairment under the ECL model', reference: 'IASB - IFRS 9 Financial Instruments' },
          { text: 'FATF - Comprehensive Risk-Based Approach (RBA) (Recommendation 1)', reference: 'FATF - Recommendation 1 and RBA guide' },
          { text: 'OECD - Principles of Corporate Governance (full disclosure)', reference: 'OECD - G20/OECD Principles of Corporate Governance 2023' },
          { text: 'COSO - Internal Control - Integrated Framework (2013/2017)', reference: 'COSO - Internal Control - Integrated Framework' },
        ],
      },
    ],
  },
  avertissement: {
    heading: 'Legal Disclaimer',
    paragraphs: [
      'This article constitutes an informative and educational analysis based on official texts in force as of its last update (June 20, 2026). It is intended to provide general insight into the regulatory framework applicable to financial institutions in the WAEMU zone.',
      'It shall not substitute for specific legal, regulatory or prudential advice. The texts cited may be subject to amendment, repeal or revision subsequent to the date of publication. The thresholds, deadlines and amounts mentioned are provided for indicative purposes based on the texts in force as of the stated date.',
      'The financial institutions concerned must imperatively consult the applicable official texts in their most recent version, available from the competent authorities (BCEAO, CB-UMOA, national CENTIF, OHADA), and, where appropriate, seek specialized support for the assessment of their specific situation.',
      'KHEPRA EXPERTS disclaims all liability for any use that may be made of the information contained in this article in the absence of professional consultation adapted to the specific situation of the institution concerned.',
    ],
  },
};



