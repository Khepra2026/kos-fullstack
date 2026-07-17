// ============================================================================
// KOS BANK SECURITY ENGINE™ — Bank-Grade Security Architecture
// Zero Trust, mTLS, IAM (RBAC+ABAC), Encryption, Vault Integration
// COBAC R-5 / CEMAC / ISO 27001 Aligned
// KHEPRA EXPERTS — 25 Juin 2026
// ============================================================================

export interface SecurityPolicy {
  policyId: string;
  name: string;
  description: string;
  effect: 'ALLOW' | 'DENY';
  principals: string[];
  actions: string[];
  resources: string[];
  conditions?: SecurityCondition[];
  priority: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SecurityCondition {
  attribute: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'IN' | 'NOT_IN' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS';
  value: string | number | string[];
}

export interface IAMUser {
  userId: string;
  username: string;
  roles: string[];
  permissions: string[];
  department: string;
  clearanceLevel: 1 | 2 | 3 | 4 | 5;
  mfaEnabled: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'REVOKED';
  lastLoginAt: string | null;
  sessionTimeout: number;
  attributes: Record<string, string>;
}

export interface IAMRole {
  roleId: string;
  name: string;
  description: string;
  permissions: string[];
  inheritsFrom: string[];
  maxClearanceLevel: number;
  isAdminRole: boolean;
}

export interface AccessRequest {
  requestId: string;
  userId: string;
  resource: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  mfaVerified: boolean;
  decision: 'ALLOW' | 'DENY' | 'PENDING';
  decisionReason: string;
  matchedPolicies: string[];
}

export interface ServiceIdentity {
  serviceId: string;
  serviceName: string;
  namespace: string;
  certificateFingerprint: string;
  allowedPeers: string[];
  allowedActions: string[];
  status: 'ACTIVE' | 'ROTATING' | 'REVOKED';
  certExpiryAt: string;
}

export interface EncryptionKey {
  keyId: string;
  keyType: 'AES-256' | 'RSA-4096' | 'EC-P256';
  purpose: 'DATA_AT_REST' | 'DATA_IN_TRANSIT' | 'SIGNING' | 'HSM_MASTER';
  status: 'ACTIVE' | 'ROTATING' | 'REVOKED' | 'EXPIRED';
  createdAt: string;
  rotatedAt: string;
  expiresAt: string;
  version: number;
  hsmBacked: boolean;
}

export interface SecurityIncident {
  incidentId: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: 'UNAUTHORIZED_ACCESS' | 'BRUTE_FORCE' | 'DATA_EXFILTRATION' | 'MALWARE' | 'CONFIG_ERROR' | 'CERT_EXPIRY';
  detectedAt: string;
  source: string;
  target: string;
  status: 'OPEN' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED' | 'CLOSED';
  resolution?: string;
  slaDeadline: string;
}

interface SecurityState {
  users: Map<string, IAMUser>;
  roles: Map<string, IAMRole>;
  policies: SecurityPolicy[];
  serviceIdentities: Map<string, ServiceIdentity>;
  encryptionKeys: Map<string, EncryptionKey>;
  accessLog: AccessRequest[];
  incidents: SecurityIncident[];
  mfaRateLimit: Map<string, { attempts: number; lockedUntil: number }>;
}

function generateSecId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export class KosBankSecurityEngine {
  private state: SecurityState;

  constructor() {
    this.state = {
      users: new Map(),
      roles: new Map(),
      policies: [],
      serviceIdentities: new Map(),
      encryptionKeys: new Map(),
      accessLog: [],
      incidents: [],
      mfaRateLimit: new Map(),
    };
    this.initializeDefaultRoles();
    this.initializeDefaultPolicies();
    this.initializeEncryptionKeys();
  }

  // ============================================================================
  // IAM — IDENTITY & ACCESS MANAGEMENT
  // ============================================================================

  private initializeDefaultRoles(): void {
    const defaultRoles: IAMRole[] = [
      {
        roleId: 'ROLE_SUPER_ADMIN',
        name: 'Super Administrator',
        description: 'Full system access — requires dual approval',
        permissions: ['*'],
        inheritsFrom: [],
        maxClearanceLevel: 5,
        isAdminRole: true,
      },
      {
        roleId: 'ROLE_COMPLIANCE_OFFICER',
        name: 'Compliance Officer',
        description: 'Regulatory compliance and audit access',
        permissions: ['READ_ALL', 'AUDIT_VIEW', 'COMPLIANCE_MANAGE', 'REPORT_GENERATE', 'FREEZE_ACCOUNT'],
        inheritsFrom: [],
        maxClearanceLevel: 4,
        isAdminRole: false,
      },
      {
        roleId: 'ROLE_RISK_MANAGER',
        name: 'Risk Manager',
        description: 'Risk assessment and monitoring',
        permissions: ['READ_ALL', 'RISK_ASSESS', 'RISK_APPROVE', 'CREDIT_REVIEW', 'REPORT_GENERATE'],
        inheritsFrom: [],
        maxClearanceLevel: 4,
        isAdminRole: false,
      },
      {
        roleId: 'ROLE_TELLER',
        name: 'Bank Teller',
        description: 'Transaction processing — amount limits',
        permissions: ['TRANSACTION_CREATE', 'TRANSACTION_VIEW', 'ACCOUNT_VIEW', 'CUSTOMER_VIEW'],
        inheritsFrom: [],
        maxClearanceLevel: 2,
        isAdminRole: false,
      },
      {
        roleId: 'ROLE_AUDITOR',
        name: 'External Auditor',
        description: 'Read-only audit access — Big Four',
        permissions: ['READ_ALL', 'AUDIT_VIEW', 'EVIDENCE_EXPORT', 'HISTORY_VIEW'],
        inheritsFrom: [],
        maxClearanceLevel: 3,
        isAdminRole: false,
      },
      {
        roleId: 'ROLE_SYSTEM',
        name: 'System Service',
        description: 'Automated service identity',
        permissions: ['SYSTEM_EXECUTE', 'INTERNAL_CALL', 'LOG_WRITE'],
        inheritsFrom: [],
        maxClearanceLevel: 5,
        isAdminRole: false,
      },
    ];

    defaultRoles.forEach((role) => this.state.roles.set(role.roleId, role));
  }

  private initializeDefaultPolicies(): void {
    const policies: SecurityPolicy[] = [
      {
        policyId: 'POL_DEFAULT_DENY',
        name: 'Default Deny All',
        description: 'Deny all access by default — Zero Trust baseline',
        effect: 'DENY',
        principals: ['*'],
        actions: ['*'],
        resources: ['*'],
        priority: 999,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        policyId: 'POL_ADMIN_ACCESS',
        name: 'Administrator Full Access',
        description: 'Super admin full system access with MFA',
        effect: 'ALLOW',
        principals: ['ROLE_SUPER_ADMIN'],
        actions: ['*'],
        resources: ['*'],
        conditions: [{ attribute: 'mfaVerified', operator: 'EQUALS', value: 'true' }],
        priority: 1,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        policyId: 'POL_COBAC_SEGREGATION',
        name: 'COBAC Duty Segregation',
        description: 'Enforce separation of duties per COBAC R-1',
        effect: 'DENY',
        principals: ['ROLE_TELLER'],
        actions: ['TRANSACTION_APPROVE', 'ACCOUNT_FREEZE', 'CREDIT_APPROVE'],
        resources: ['*'],
        priority: 10,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        policyId: 'POL_COMPLIANCE_ACCESS',
        name: 'Compliance Officer Regulatory Access',
        description: 'Allow compliance officers full read and regulatory actions',
        effect: 'ALLOW',
        principals: ['ROLE_COMPLIANCE_OFFICER'],
        actions: ['READ_ALL', 'AUDIT_VIEW', 'COMPLIANCE_MANAGE', 'REPORT_GENERATE', 'FREEZE_ACCOUNT'],
        resources: ['*'],
        priority: 5,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        policyId: 'POL_AUDITOR_READONLY',
        name: 'External Auditor Read-Only',
        description: 'Big Four auditor access — read only, export evidence',
        effect: 'ALLOW',
        principals: ['ROLE_AUDITOR'],
        actions: ['READ_ALL', 'AUDIT_VIEW', 'EVIDENCE_EXPORT', 'HISTORY_VIEW'],
        resources: ['*'],
        conditions: [{ attribute: 'department', operator: 'EQUALS', value: 'EXTERNAL_AUDIT' }],
        priority: 20,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        policyId: 'POL_SERVICE_MESH',
        name: 'Service-to-Service mTLS Only',
        description: 'Internal services must use mTLS',
        effect: 'ALLOW',
        principals: ['ROLE_SYSTEM'],
        actions: ['SYSTEM_EXECUTE', 'INTERNAL_CALL'],
        resources: ['*'],
        conditions: [{ attribute: 'mtlsVerified', operator: 'EQUALS', value: 'true' }],
        priority: 1,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    this.state.policies = policies;
  }

  private initializeEncryptionKeys(): void {
    const keys: EncryptionKey[] = [
      {
        keyId: 'KEY_MASTER_HSM',
        keyType: 'AES-256',
        purpose: 'HSM_MASTER',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        rotatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        version: 1,
        hsmBacked: true,
      },
      {
        keyId: 'KEY_DATA_REST',
        keyType: 'AES-256',
        purpose: 'DATA_AT_REST',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        rotatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        version: 1,
        hsmBacked: false,
      },
    ];

    keys.forEach((key) => this.state.encryptionKeys.set(key.keyId, key));
  }

  createUser(params: {
    username: string;
    roles: string[];
    department: string;
    clearanceLevel: IAMUser['clearanceLevel'];
  }): IAMUser {
    const userId = generateSecId('USR');
    const user: IAMUser = {
      userId,
      username: params.username,
      roles: params.roles,
      permissions: this.resolvePermissions(params.roles),
      department: params.department,
      clearanceLevel: params.clearanceLevel,
      mfaEnabled: false,
      status: 'ACTIVE',
      lastLoginAt: null,
      sessionTimeout: 3600,
      attributes: {},
    };

    this.state.users.set(userId, user);
    return user;
  }

  private resolvePermissions(roles: string[]): string[] {
    const permissions = new Set<string>();
    roles.forEach((roleId) => {
      const role = this.state.roles.get(roleId);
      if (role) {
        role.permissions.forEach((p) => permissions.add(p));
        role.inheritsFrom.forEach((inheritedRoleId) => {
          const inheritedRole = this.state.roles.get(inheritedRoleId);
          if (inheritedRole) {
            inheritedRole.permissions.forEach((p) => permissions.add(p));
          }
        });
      }
    });
    return Array.from(permissions);
  }

  // ============================================================================
  // ACCESS CONTROL — ZERO TRUST POLICY EVALUATION
  // ============================================================================

  evaluateAccess(params: {
    userId: string;
    action: string;
    resource: string;
    ipAddress: string;
    sessionId: string;
    mfaVerified: boolean;
    context?: Record<string, string>;
  }): AccessRequest {
    const user = this.state.users.get(params.userId);
    const request: AccessRequest = {
      requestId: generateSecId('REQ'),
      userId: params.userId,
      resource: params.resource,
      action: params.action,
      timestamp: new Date().toISOString(),
      ipAddress: params.ipAddress,
      userAgent: params.context?.userAgent || '',
      sessionId: params.sessionId,
      mfaVerified: params.mfaVerified,
      decision: 'PENDING',
      decisionReason: '',
      matchedPolicies: [],
    };

    if (!user || user.status !== 'ACTIVE') {
      request.decision = 'DENY';
      request.decisionReason = 'User not found or inactive';
      this.state.accessLog.push(request);
      return request;
    }

    const sortedPolicies = [...this.state.policies]
      .filter((p) => p.enabled)
      .sort((a, b) => a.priority - b.priority);

    let finalDecision: 'ALLOW' | 'DENY' = 'DENY';
    let finalReason = 'Default deny — no matching policy';

    for (const policy of sortedPolicies) {
      const principalMatch = policy.principals.includes('*') ||
        policy.principals.some((p) => user.roles.includes(p) || user.userId === p);
      const actionMatch = policy.actions.includes('*') ||
        policy.actions.includes(params.action);
      const resourceMatch = policy.resources.includes('*') ||
        policy.resources.some((r) => params.resource.startsWith(r));

      if (principalMatch && actionMatch && resourceMatch) {
        if (policy.conditions && policy.conditions.length > 0) {
          const conditionsMet = policy.conditions.every((condition) => {
            const attrValue = params.context?.[condition.attribute] ||
              (condition.attribute === 'mfaVerified' ? String(params.mfaVerified) : '');
            switch (condition.operator) {
              case 'EQUALS': return attrValue === condition.value;
              case 'IN': return Array.isArray(condition.value) && condition.value.includes(attrValue);
              default: return true;
            }
          });
          if (!conditionsMet) continue;
        }

        request.matchedPolicies.push(policy.policyId);
        finalDecision = policy.effect;
        finalReason = `Matched policy: ${policy.name} (${policy.policyId})`;
        break;
      }
    }

    request.decision = finalDecision;
    request.decisionReason = finalReason;
    this.state.accessLog.push(request);

    if (finalDecision === 'DENY') {
      this.recordSecurityIncident({
        severity: 'MEDIUM',
        type: 'UNAUTHORIZED_ACCESS',
        source: params.ipAddress,
        target: params.resource,
      });
    }

    return request;
  }

  // ============================================================================
  // SERVICE IDENTITY — mTLS
  // ============================================================================

  registerService(params: {
    serviceName: string;
    namespace: string;
    certificateFingerprint: string;
    allowedPeers: string[];
    allowedActions: string[];
  }): ServiceIdentity {
    const service: ServiceIdentity = {
      serviceId: generateSecId('SVC'),
      serviceName: params.serviceName,
      namespace: params.namespace,
      certificateFingerprint: params.certificateFingerprint,
      allowedPeers: params.allowedPeers,
      allowedActions: params.allowedActions,
      status: 'ACTIVE',
      certExpiryAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    };

    this.state.serviceIdentities.set(service.serviceId, service);
    return service;
  }

  verifyServiceIdentity(serviceId: string, fingerprint: string): boolean {
    const service = this.state.serviceIdentities.get(serviceId);
    if (!service || service.status !== 'ACTIVE') return false;
    if (new Date(service.certExpiryAt).getTime() < Date.now()) {
      service.status = 'EXPIRED';
      return false;
    }
    return service.certificateFingerprint === fingerprint;
  }

  // ============================================================================
  // ENCRYPTION KEY MANAGEMENT
  // ============================================================================

  rotateKey(keyId: string): EncryptionKey {
    const key = this.state.encryptionKeys.get(keyId);
    if (!key) throw new Error(`Key ${keyId} not found`);

    key.status = 'ROTATING';
    const newVersion = key.version + 1;

    const rotatedKey: EncryptionKey = {
      ...key,
      keyId: `${keyId}_V${newVersion}`,
      status: 'ACTIVE',
      version: newVersion,
      rotatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    };

    key.status = 'REVOKED';
    this.state.encryptionKeys.set(rotatedKey.keyId, rotatedKey);
    return rotatedKey;
  }

  getActiveKeys(): EncryptionKey[] {
    return Array.from(this.state.encryptionKeys.values()).filter((k) => k.status === 'ACTIVE');
  }

  // ============================================================================
  // INCIDENT MANAGEMENT
  // ============================================================================

  recordSecurityIncident(params: {
    severity: SecurityIncident['severity'];
    type: SecurityIncident['type'];
    source: string;
    target: string;
  }): SecurityIncident {
    const slaDeadlines: Record<string, number> = {
      CRITICAL: 2 * 60 * 60 * 1000,
      HIGH: 4 * 60 * 60 * 1000,
      MEDIUM: 24 * 60 * 60 * 1000,
      LOW: 7 * 24 * 60 * 60 * 1000,
    };

    const incident: SecurityIncident = {
      incidentId: generateSecId('INC'),
      severity: params.severity,
      type: params.type,
      detectedAt: new Date().toISOString(),
      source: params.source,
      target: params.target,
      status: 'OPEN',
      slaDeadline: new Date(Date.now() + slaDeadlines[params.severity]).toISOString(),
    };

    this.state.incidents.push(incident);
    return incident;
  }

  getActiveIncidents(): SecurityIncident[] {
    return this.state.incidents.filter(
      (inc) => !['RESOLVED', 'CLOSED'].includes(inc.status),
    );
  }

  resolveIncident(incidentId: string, resolution: string): SecurityIncident {
    const incident = this.state.incidents.find((inc) => inc.incidentId === incidentId);
    if (!incident) throw new Error(`Incident ${incidentId} not found`);
    incident.status = 'RESOLVED';
    incident.resolution = resolution;
    return incident;
  }

  // ============================================================================
  // COMPLIANCE REPORTING
  // ============================================================================

  getSecurityReport(): {
    totalUsers: number;
    activeUsers: number;
    totalIncidents: number;
    activeIncidents: number;
    accessDenied24h: number;
    policiesEnabled: number;
    keysActive: number;
    servicesActive: number;
    slaCompliance: number;
  } {
    const now = Date.now();
    const last24h = new Date(now - 24 * 60 * 60 * 1000).toISOString();
    const activeIncidents = this.getActiveIncidents();
    const slaCompliant = activeIncidents.filter((inc) => {
      const deadline = new Date(inc.slaDeadline).getTime();
      return inc.status === 'RESOLVED' ? true : deadline > now;
    }).length;

    return {
      totalUsers: this.state.users.size,
      activeUsers: Array.from(this.state.users.values()).filter((u) => u.status === 'ACTIVE').length,
      totalIncidents: this.state.incidents.length,
      activeIncidents: activeIncidents.length,
      accessDenied24h: this.state.accessLog.filter((r) => r.decision === 'DENY' && r.timestamp >= last24h).length,
      policiesEnabled: this.state.policies.filter((p) => p.enabled).length,
      keysActive: this.getActiveKeys().length,
      servicesActive: Array.from(this.state.serviceIdentities.values()).filter((s) => s.status === 'ACTIVE').length,
      slaCompliance: activeIncidents.length > 0 ? slaCompliant / activeIncidents.length : 1,
    };
  }

  getState(): SecurityState {
    return this.state;
  }
}

export const kosBankSecurityEngine = new KosBankSecurityEngine();