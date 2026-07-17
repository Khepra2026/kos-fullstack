import { supabase } from '@/lib/supabase';
import { calculateLeadScore, generateLeadSummary, getEmailSequence, type LeadData } from '@/components/feature/LeadScoringEngine';

interface LeadData {
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  job_title?: string;
  organization_size?: string;
  subject?: string;
  message?: string;
  source_page: string;
  form_type?: 'diagnostic' | 'contact' | 'expert' | 'newsletter' | 'webinar' | 'whitepaper' | 'tool';
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/**
 * Soumet un lead et déclenche la séquence d'emails automatique
 */
export async function submitLead(data: {
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  position?: string;
  organizationType?: string;
  budget?: string;
  timeline?: string;
  priority?: string;
  subject?: string;
  message?: string;
  source_page: string;
  form_type: string;
  metadata?: Record<string, any>;
}): Promise<{ success: boolean; lead?: any; score?: any; error?: any }> {
  try {
    // Calculer le score du lead
    const leadData: LeadData = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      position: data.position,
      organizationType: data.organizationType,
      budget: data.budget,
      timeline: data.timeline,
      priority: data.priority,
      source_page: data.source_page,
      form_type: data.form_type,
      metadata: {
        ...data.metadata,
        message: data.message,
        subject: data.subject,
      },
    };

    const score = calculateLeadScore(leadData);
    const emailSequence = getEmailSequence(score);
    const summary = generateLeadSummary(leadData, score);

    // Enregistrer dans Supabase
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        position: data.position,
        subject: data.subject || data.form_type,
        message: data.message,
        source_page: data.source_page,
        form_type: data.form_type,
        lead_score: score.total,
        lead_category: score.category,
        score_breakdown: score.breakdown,
        recommendations: score.recommendations,
        email_sequence: emailSequence,
        metadata: {
          ...data.metadata,
          organizationType: data.organizationType,
          budget: data.budget,
          timeline: data.timeline,
          priority: data.priority,
          summary,
        },
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de l\'enregistrement du lead:', error);
      return { success: false, error };
    }

    // Tracking Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_submission', {
        event_category: 'Lead',
        event_label: data.form_type,
        value: score.total,
        lead_category: score.category,
      });
    }

    // Envoyer une notification si lead chaud
    if (score.category === 'hot') {
      await sendHotLeadNotification(lead);
    }

    return { success: true, lead, score };
  } catch (error) {
    console.error('Erreur lors de la soumission du lead:', error);
    return { success: false, error };
  }
}

async function sendHotLeadNotification(lead: any) {
  try {
    // Appeler l'edge function pour envoyer une notification immédiate
    await supabase.functions.invoke('send-scheduled-emails', {
      body: {
        action: 'welcome',
        lead_id: lead.id,
        email: lead.email,
        full_name: lead.full_name,
        subject: 'Lead chaud détecté',
        organization: lead.organization || '',
        assigned_expert: lead.assigned_expert || 'Essoyomèwè SIMDA',
      },
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification:', error);
  }
}

/**
 * Track le clic sur le lien calendrier
 */
export async function trackCalendarClick(leadEmail: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('leads')
      .update({
        calendar_link_clicked: true,
        updated_at: new Date().toISOString(),
      })
      .eq('email', leadEmail);

    if (error) {
      if (import.meta.env.DEV) console.error('Erreur tracking calendrier:', error);
    }

    // Tracking Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'calendar_click', {
        event_category: 'Conversion',
        event_label: 'Diagnostic Booking',
      });
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error('Erreur trackCalendarClick:', error);
  }
}

/**
 * Track l'ouverture d'un email (via pixel de tracking)
 */
export async function trackEmailOpen(leadId: string, emailNumber: 1 | 2 | 3): Promise<void> {
  try {
    const updateField = `email_${emailNumber}_opened`;
    const { error } = await supabase
      .from('leads')
      .update({
        [updateField]: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    if (error) {
      if (import.meta.env.DEV) console.error('Erreur tracking email open:', error);
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error('Erreur trackEmailOpen:', error);
  }
}

/**
 * Mettre à jour le statut d'un lead
 */
export async function updateLeadStatus(
  leadEmail: string,
  status: 'new' | 'email_1_sent' | 'email_2_sent' | 'email_3_sent' | 'meeting_scheduled' | 'qualified' | 'converted' | 'lost',
  notes?: string
): Promise<void> {
  try {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (notes) {
      updateData.notes = notes;
    }

    if (status === 'meeting_scheduled') {
      updateData.meeting_scheduled_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('email', leadEmail);

    if (error) {
      if (import.meta.env.DEV) console.error('Erreur mise à jour statut lead:', error);
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error('Erreur updateLeadStatus:', error);
  }
}

/**
 * Récupérer les statistiques des leads
 */
export async function getLeadStats(): Promise<{
  total: number;
  new: number;
  email_1_sent: number;
  email_2_sent: number;
  email_3_sent: number;
  meeting_scheduled: number;
  qualified: number;
  converted: number;
  conversion_rate: number;
}> {
  try {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('status');

    if (error) {
      if (import.meta.env.DEV) console.error('Erreur récupération stats:', error);
      return {
        total: 0,
        new: 0,
        email_1_sent: 0,
        email_2_sent: 0,
        email_3_sent: 0,
        meeting_scheduled: 0,
        qualified: 0,
        converted: 0,
        conversion_rate: 0,
      };
    }

    const stats = {
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      email_1_sent: leads.filter(l => l.status === 'email_1_sent').length,
      email_2_sent: leads.filter(l => l.status === 'email_2_sent').length,
      email_3_sent: leads.filter(l => l.status === 'email_3_sent').length,
      meeting_scheduled: leads.filter(l => l.status === 'meeting_scheduled').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      converted: leads.filter(l => l.status === 'converted').length,
      conversion_rate: leads.length > 0 ? (leads.filter(l => l.status === 'converted').length / leads.length) * 100 : 0,
    };

    return stats;
  } catch (error) {
    if (import.meta.env.DEV) console.error('Erreur getLeadStats:', error);
    return {
      total: 0,
      new: 0,
      email_1_sent: 0,
      email_2_sent: 0,
      email_3_sent: 0,
      meeting_scheduled: 0,
      qualified: 0,
      converted: 0,
      conversion_rate: 0,
    };
  }
}