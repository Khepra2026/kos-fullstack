export interface Reporting {
  id: string
  created_at: string
  updated_at: string
  organization_id: string
  name: string
  data?: Record<string, any>
}
