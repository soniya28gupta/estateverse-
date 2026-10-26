import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase (if configured)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Safe client with fallback
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Service functions with resilient local fallback for demo mode
 */
export async function fetchLiveProperties() {
  if (!supabase) {
    return { data: null, error: null, isFallback: true };
  }
  try {
    const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    return { data, error, isFallback: false };
  } catch (err) {
    return { data: null, error: err, isFallback: true };
  }
}

export async function submitLiveInquiry(inquiry: {
  property_id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  if (!supabase) {
    return { success: true, message: 'Inquiry saved locally in demo mode.', isFallback: true };
  }
  try {
    const { data, error } = await supabase.from('inquiries').insert([inquiry]).select();
    if (error) throw error;
    return { success: true, data, isFallback: false };
  } catch (err: any) {
    return { success: false, error: err.message, isFallback: true };
  }
}
