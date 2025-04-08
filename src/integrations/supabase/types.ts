export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_agents: {
        Row: {
          capabilities: string[] | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          max_tokens: number
          model: string
          name: string
          prompt_template: string
          provider: string
          temperature: number
          type: string
          updated_at: string
        }
        Insert: {
          capabilities?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          max_tokens?: number
          model: string
          name: string
          prompt_template: string
          provider: string
          temperature?: number
          type?: string
          updated_at?: string
        }
        Update: {
          capabilities?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          max_tokens?: number
          model?: string
          name?: string
          prompt_template?: string
          provider?: string
          temperature?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_generated_files: {
        Row: {
          created_at: string | null
          filename: string
          id: string
          project_id: string | null
          prompt: string | null
          provider: string | null
          storage_path: string
          type: string
        }
        Insert: {
          created_at?: string | null
          filename: string
          id?: string
          project_id?: string | null
          prompt?: string | null
          provider?: string | null
          storage_path: string
          type: string
        }
        Update: {
          created_at?: string | null
          filename?: string
          id?: string
          project_id?: string | null
          prompt?: string | null
          provider?: string | null
          storage_path?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_generated_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          company: string | null
          created_at: string
          duration: string
          email: string
          id: string
          meeting_type: string
          name: string
          notes: string | null
          notified_at: string | null
          phone: string | null
          processed_at: string | null
          scheduled_at: string
          status: string
          topic: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          duration: string
          email: string
          id?: string
          meeting_type: string
          name: string
          notes?: string | null
          notified_at?: string | null
          phone?: string | null
          processed_at?: string | null
          scheduled_at: string
          status?: string
          topic: string
        }
        Update: {
          company?: string | null
          created_at?: string
          duration?: string
          email?: string
          id?: string
          meeting_type?: string
          name?: string
          notes?: string | null
          notified_at?: string | null
          phone?: string | null
          processed_at?: string | null
          scheduled_at?: string
          status?: string
          topic?: string
        }
        Relationships: []
      }
      campaign_sends: {
        Row: {
          campaign_id: string
          clicked_at: string | null
          error_message: string | null
          id: string
          links_clicked: Json | null
          opened_at: string | null
          recipient_id: string
          sent_at: string | null
          status: string
        }
        Insert: {
          campaign_id: string
          clicked_at?: string | null
          error_message?: string | null
          id?: string
          links_clicked?: Json | null
          opened_at?: string | null
          recipient_id: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          campaign_id?: string
          clicked_at?: string | null
          error_message?: string | null
          id?: string
          links_clicked?: Json | null
          opened_at?: string | null
          recipient_id?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_sends_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "marketing_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          email_type: string
          error_message: string | null
          id: string
          inquiry_id: string | null
          metadata: Json | null
          recipient: string
          sent_at: string
          subject: string | null
          successful: boolean | null
        }
        Insert: {
          email_type: string
          error_message?: string | null
          id?: string
          inquiry_id?: string | null
          metadata?: Json | null
          recipient: string
          sent_at?: string
          subject?: string | null
          successful?: boolean | null
        }
        Update: {
          email_type?: string
          error_message?: string | null
          id?: string
          inquiry_id?: string | null
          metadata?: Json | null
          recipient?: string
          sent_at?: string
          subject?: string | null
          successful?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          additional_info: string | null
          ai_type: string | null
          budget: string | null
          business_name: string | null
          business_type: string | null
          company: string | null
          company_size: string | null
          created_at: string
          current_markets: string | null
          data_available: string | null
          email: string
          expansion_goals: string | null
          features: string[] | null
          id: string
          industry: string | null
          location: string | null
          message: string | null
          meta: Json | null
          name: string
          phone: string | null
          position: string | null
          processed: boolean | null
          products: string | null
          project_type: string | null
          requirements: string | null
          service: string
          services: string[] | null
          status: string | null
          store_type: string | null
          subscribe: boolean | null
          target_markets: string | null
          timeline: string | null
        }
        Insert: {
          additional_info?: string | null
          ai_type?: string | null
          budget?: string | null
          business_name?: string | null
          business_type?: string | null
          company?: string | null
          company_size?: string | null
          created_at?: string
          current_markets?: string | null
          data_available?: string | null
          email: string
          expansion_goals?: string | null
          features?: string[] | null
          id?: string
          industry?: string | null
          location?: string | null
          message?: string | null
          meta?: Json | null
          name: string
          phone?: string | null
          position?: string | null
          processed?: boolean | null
          products?: string | null
          project_type?: string | null
          requirements?: string | null
          service: string
          services?: string[] | null
          status?: string | null
          store_type?: string | null
          subscribe?: boolean | null
          target_markets?: string | null
          timeline?: string | null
        }
        Update: {
          additional_info?: string | null
          ai_type?: string | null
          budget?: string | null
          business_name?: string | null
          business_type?: string | null
          company?: string | null
          company_size?: string | null
          created_at?: string
          current_markets?: string | null
          data_available?: string | null
          email?: string
          expansion_goals?: string | null
          features?: string[] | null
          id?: string
          industry?: string | null
          location?: string | null
          message?: string | null
          meta?: Json | null
          name?: string
          phone?: string | null
          position?: string | null
          processed?: boolean | null
          products?: string | null
          project_type?: string | null
          requirements?: string | null
          service?: string
          services?: string[] | null
          status?: string | null
          store_type?: string | null
          subscribe?: boolean | null
          target_markets?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      lead_sources: {
        Row: {
          active: boolean
          created_at: string | null
          description: string | null
          id: string
          name: string
          source_type: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          source_type?: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          source_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      marketing_campaigns: {
        Row: {
          content: string
          created_at: string
          id: string
          name: string
          recipient_count: number | null
          scheduled_at: string | null
          segment_ids: string[] | null
          status: string
          subject: string
          template: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          name: string
          recipient_count?: number | null
          scheduled_at?: string | null
          segment_ids?: string[] | null
          status?: string
          subject: string
          template?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          name?: string
          recipient_count?: number | null
          scheduled_at?: string | null
          segment_ids?: string[] | null
          status?: string
          subject?: string
          template?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      marketing_recipients: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          source_id: string | null
          subscribed: boolean | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          source_id?: string | null
          subscribed?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          source_id?: string | null
          subscribed?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_recipients_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "lead_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_segments: {
        Row: {
          created_at: string | null
          criteria: Json
          description: string | null
          id: string
          name: string
          recipient_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          criteria?: Json
          description?: string | null
          id?: string
          name: string
          recipient_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          description?: string | null
          id?: string
          name?: string
          recipient_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string | null
          id: string
          is_dropdown: boolean | null
          label: string
          parent_id: string | null
          position: number
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_dropdown?: boolean | null
          label: string
          parent_id?: string | null
          position?: number
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_dropdown?: boolean | null
          label?: string
          parent_id?: string | null
          position?: number
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "navigation_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "navigation_items"
            referencedColumns: ["id"]
          },
        ]
      }
      page_sections: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          page_id: string | null
          position: number
          section_name: string
          section_type: string
          updated_at: string | null
        }
        Insert: {
          content?: Json
          created_at?: string | null
          id?: string
          page_id?: string | null
          position?: number
          section_name: string
          section_type: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          page_id?: string | null
          position?: number
          section_name?: string
          section_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          active: boolean
          applicable_to: string[] | null
          code: string
          created_at: string | null
          description: string | null
          discount: number
          discount_type: string
          id: string
          max_uses: number | null
          times_used: number
          updated_at: string | null
          valid_from: string
          valid_to: string
        }
        Insert: {
          active?: boolean
          applicable_to?: string[] | null
          code: string
          created_at?: string | null
          description?: string | null
          discount: number
          discount_type: string
          id?: string
          max_uses?: number | null
          times_used?: number
          updated_at?: string | null
          valid_from?: string
          valid_to: string
        }
        Update: {
          active?: boolean
          applicable_to?: string[] | null
          code?: string
          created_at?: string | null
          description?: string | null
          discount?: number
          discount_type?: string
          id?: string
          max_uses?: number | null
          times_used?: number
          updated_at?: string | null
          valid_from?: string
          valid_to?: string
        }
        Relationships: []
      }
      scheduled_emails: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          recipients: string[]
          scheduled_at: string
          sent: boolean | null
          sent_at: string | null
          subject: string
          template_content: Json
          template_type: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          recipients: string[]
          scheduled_at: string
          sent?: boolean | null
          sent_at?: string | null
          subject: string
          template_content: Json
          template_type: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          recipients?: string[]
          scheduled_at?: string
          sent?: boolean | null
          sent_at?: string | null
          subject?: string
          template_content?: Json
          template_type?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          settings: Json
          updated_at: string | null
        }
        Insert: {
          id: string
          settings?: Json
          updated_at?: string | null
        }
        Update: {
          id?: string
          settings?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      staff_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          full_name: string | null
          id: string
          position: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id: string
          position?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id?: string
          position?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          active: boolean | null
          email: string
          id: string
          name: string | null
          source: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          active?: boolean | null
          email: string
          id?: string
          name?: string | null
          source?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          active?: boolean | null
          email?: string
          id?: string
          name?: string | null
          source?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_documents: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
