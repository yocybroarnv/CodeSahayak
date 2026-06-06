import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'student' | 'teacher' | 'admin';
          avatar_url: string | null;
          language: string;
          is_pro: boolean;
          pro_expires_at: string | null;
          streak: number;
          xp: number;
          level: number;
          created_at: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          language: string;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      files: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          path: string;
          content: string;
          language: string;
          is_folder: boolean;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      code_snippets: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          code: string;
          language: string;
          description: string | null;
          tags: string[];
          is_public: boolean;
          created_at: string;
        };
      };
      learning_progress: {
        Row: {
          id: string;
          user_id: string;
          concept: string;
          language: string;
          mastery_level: number;
          attempts: number;
          correct_attempts: number;
          last_attempt_at: string | null;
        };
      };
      ai_conversations: {
        Row: {
          id: string;
          user_id: string;
          project_id: string | null;
          messages: {
            role: 'user' | 'assistant';
            content: string;
            timestamp: string;
          }[];
          created_at: string;
        };
      };
    };
  };
};
