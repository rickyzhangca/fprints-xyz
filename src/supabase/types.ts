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
      blueprint_tags: {
        Row: {
          blueprint_id: string
          id: string
          is_main_tag: boolean
          tag_id: string
          tagged_at: string
          user_id: string
        }
        Insert: {
          blueprint_id?: string
          id?: string
          is_main_tag?: boolean
          tag_id?: string
          tagged_at?: string
          user_id?: string
        }
        Update: {
          blueprint_id?: string
          id?: string
          is_main_tag?: boolean
          tag_id?: string
          tagged_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blueprint_tags_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprint_tags_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprint_tags_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprint_tags_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "collection_blueprint_cards"
            referencedColumns: ["blueprint_id"]
          },
          {
            foreignKeyName: "blueprint_tags_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprint_tags_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_liked_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprint_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blueprint_card"
            referencedColumns: ["main_tag_id"]
          },
          {
            foreignKeyName: "blueprint_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "collection_blueprint_cards"
            referencedColumns: ["main_tag_id"]
          },
          {
            foreignKeyName: "blueprint_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "my_blueprint_cards"
            referencedColumns: ["main_tag_id"]
          },
          {
            foreignKeyName: "blueprint_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "my_liked_blueprint_cards"
            referencedColumns: ["main_tag_id"]
          },
          {
            foreignKeyName: "blueprint_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blueprints: {
        Row: {
          _dep: string | null
          background: Database["public"]["Enums"]["background"] | null
          blueprint_string: string
          components: string[]
          copy_count: number
          created_at: string
          description: string
          game_version: string
          id: string
          image_original_width: number | null
          image_url: string
          is_public: boolean
          meta: string[]
          remixed_from_title: string | null
          remixed_from_url: string | null
          title: string
          title_description_tsv: unknown | null
          type: Database["public"]["Enums"]["type"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          _dep?: string | null
          background?: Database["public"]["Enums"]["background"] | null
          blueprint_string: string
          components?: string[]
          copy_count?: number
          created_at?: string
          description?: string
          game_version?: string
          id?: string
          image_original_width?: number | null
          image_url?: string
          is_public?: boolean
          meta?: string[]
          remixed_from_title?: string | null
          remixed_from_url?: string | null
          title: string
          title_description_tsv?: unknown | null
          type?: Database["public"]["Enums"]["type"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          _dep?: string | null
          background?: Database["public"]["Enums"]["background"] | null
          blueprint_string?: string
          components?: string[]
          copy_count?: number
          created_at?: string
          description?: string
          game_version?: string
          id?: string
          image_original_width?: number | null
          image_url?: string
          is_public?: boolean
          meta?: string[]
          remixed_from_title?: string | null
          remixed_from_url?: string | null
          title?: string
          title_description_tsv?: unknown | null
          type?: Database["public"]["Enums"]["type"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      collection_blueprints: {
        Row: {
          blueprint_id: string
          collected_at: string
          collection_id: string
          user_id: string
        }
        Insert: {
          blueprint_id?: string
          collected_at?: string
          collection_id?: string
          user_id?: string
        }
        Update: {
          blueprint_id?: string
          collected_at?: string
          collection_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_blueprints_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_blueprints_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_blueprints_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_blueprints_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "collection_blueprint_cards"
            referencedColumns: ["blueprint_id"]
          },
          {
            foreignKeyName: "collection_blueprints_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_blueprints_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_liked_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_blueprints_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: true
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string
          description: string
          id: string
          is_public: boolean
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          is_public?: boolean
          title: string
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_public?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          blueprint_id: string
          content: string
          created_at: string
          id: string
          is_deleted: boolean
          is_hidden: boolean
          parent_comment_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          blueprint_id: string
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_hidden?: boolean
          parent_comment_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          blueprint_id?: string
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_hidden?: boolean
          parent_comment_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments__blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments__blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments__blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments__blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "collection_blueprint_cards"
            referencedColumns: ["blueprint_id"]
          },
          {
            foreignKeyName: "comments__blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments__blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_liked_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments__parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          blueprint_id: string
          id: string
          liked_at: string
          user_id: string
        }
        Insert: {
          blueprint_id?: string
          id?: string
          liked_at?: string
          user_id?: string
        }
        Update: {
          blueprint_id?: string
          id?: string
          liked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "collection_blueprint_cards"
            referencedColumns: ["blueprint_id"]
          },
          {
            foreignKeyName: "likes_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_liked_blueprint_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          tag_group: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          tag_group?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          tag_group?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          color: string
          handle: string
          new_feature: string
          user_id: string
        }
        Insert: {
          color?: string
          handle: string
          new_feature?: string
          user_id?: string
        }
        Update: {
          color?: string
          handle?: string
          new_feature?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      blueprint_card: {
        Row: {
          background: Database["public"]["Enums"]["background"] | null
          created_at: string | null
          data_fetched_at: string | null
          game_version: string | null
          id: string | null
          image_original_width: number | null
          image_url: string | null
          is_public: boolean | null
          like_count: number | null
          liked_by_current_user: boolean | null
          liked_by_current_user_at: string | null
          main_tag_id: string | null
          main_tag_name: string | null
          meta: string[] | null
          title: string | null
          title_description_tsv: unknown | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
          user_color: string | null
          user_handle: string | null
          user_id: string | null
        }
        Relationships: []
      }
      blueprint_details: {
        Row: {
          _dep: string | null
          background: Database["public"]["Enums"]["background"] | null
          blueprint_string: string | null
          collected_by_current_user: boolean | null
          collected_by_current_user_at: string | null
          collection_count: number | null
          components: string[] | null
          copy_count: number | null
          created_at: string | null
          data_fetched_at: string | null
          description: string | null
          game_version: string | null
          id: string | null
          image_original_width: number | null
          image_url: string | null
          is_public: boolean | null
          like_count: number | null
          liked_by_current_user: boolean | null
          meta: string[] | null
          remixed_from_title: string | null
          remixed_from_url: string | null
          tags: Json[] | null
          title: string | null
          title_description_tsv: unknown | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
          user_handle: string | null
          user_id: string | null
        }
        Relationships: []
      }
      collection_blueprint_cards: {
        Row: {
          background: Database["public"]["Enums"]["background"] | null
          blueprint_id: string | null
          blueprint_user_color: string | null
          blueprint_user_handle: string | null
          blueprint_user_id: string | null
          collected_at: string | null
          collection_description: string | null
          collection_id: string | null
          collection_is_public: boolean | null
          collection_title: string | null
          collection_user_handle: string | null
          collection_user_id: string | null
          created_at: string | null
          data_fetched_at: string | null
          game_version: string | null
          image_original_width: number | null
          image_url: string | null
          is_public: boolean | null
          like_count: number | null
          liked_by_current_user: boolean | null
          liked_by_current_user_at: string | null
          main_tag_id: string | null
          main_tag_name: string | null
          meta: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_blueprints_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: true
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      my_blueprint_cards: {
        Row: {
          background: Database["public"]["Enums"]["background"] | null
          created_at: string | null
          data_fetched_at: string | null
          game_version: string | null
          id: string | null
          image_original_width: number | null
          image_url: string | null
          is_public: boolean | null
          like_count: number | null
          liked_by_current_user: boolean | null
          liked_by_current_user_at: string | null
          main_tag_id: string | null
          main_tag_name: string | null
          meta: string[] | null
          title: string | null
          title_description_tsv: unknown | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
          user_color: string | null
          user_handle: string | null
          user_id: string | null
        }
        Relationships: []
      }
      my_liked_blueprint_cards: {
        Row: {
          background: Database["public"]["Enums"]["background"] | null
          created_at: string | null
          data_fetched_at: string | null
          game_version: string | null
          id: string | null
          image_original_width: number | null
          image_url: string | null
          is_public: boolean | null
          like_count: number | null
          liked_at: string | null
          liked_by_current_user: boolean | null
          liked_by_current_user_at: string | null
          main_tag_id: string | null
          main_tag_name: string | null
          meta: string[] | null
          title: string | null
          title_description_tsv: unknown | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
          user_color: string | null
          user_handle: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_blueprint_stats: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      increment_blueprint_copy_count: {
        Args: {
          blueprint_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      background:
        | "minimal"
        | "refined-concrete"
        | "foundation"
        | "nauvis"
        | "vulcanus"
        | "fulgora"
        | "gleba"
        | "aquilo"
        | "space"
        | "space-nauvis"
        | "space-vulcanus"
        | "space-fulgora"
        | "space-gleba"
        | "space-aquilo"
      type:
        | "blueprint"
        | "blueprint_book"
        | "deconstruction_planner"
        | "upgrade_planner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
