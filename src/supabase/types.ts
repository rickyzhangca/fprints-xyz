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
          blueprint_string: string
          components: string[]
          created_at: string
          description: string
          forked_from_id: string | null
          game_version: string
          id: string
          image_url: string
          is_public: boolean
          meta: string[]
          title: string
          title_description_tsv: unknown | null
          type: Database["public"]["Enums"]["type"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          blueprint_string: string
          components?: string[]
          created_at?: string
          description?: string
          forked_from_id?: string | null
          game_version?: string
          id?: string
          image_url?: string
          is_public?: boolean
          meta?: string[]
          title: string
          title_description_tsv?: unknown | null
          type?: Database["public"]["Enums"]["type"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          blueprint_string?: string
          components?: string[]
          created_at?: string
          description?: string
          forked_from_id?: string | null
          game_version?: string
          id?: string
          image_url?: string
          is_public?: boolean
          meta?: string[]
          title?: string
          title_description_tsv?: unknown | null
          type?: Database["public"]["Enums"]["type"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "blueprint_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "blueprint_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "blueprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "collection_blueprint_cards"
            referencedColumns: ["blueprint_id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "my_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "my_liked_blueprint_cards"
            referencedColumns: ["id"]
          },
        ]
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
          parent_comment_id: string | null
          user_id: string
        }
        Insert: {
          blueprint_id?: string
          content: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          user_id?: string
        }
        Update: {
          blueprint_id?: string
          content?: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprint_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "blueprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "collection_blueprint_cards"
            referencedColumns: ["blueprint_id"]
          },
          {
            foreignKeyName: "comments_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_blueprint_id_fkey"
            columns: ["blueprint_id"]
            isOneToOne: false
            referencedRelation: "my_liked_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
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
          user_id: string
        }
        Insert: {
          color?: string
          handle: string
          user_id?: string
        }
        Update: {
          color?: string
          handle?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      blueprint_card: {
        Row: {
          created_at: string | null
          data_fetched_at: string | null
          game_version: string | null
          id: string | null
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
          blueprint_string: string | null
          collected_by_current_user: boolean | null
          collected_by_current_user_at: string | null
          collection_count: number | null
          components: string[] | null
          created_at: string | null
          data_fetched_at: string | null
          description: string | null
          forked_from_id: string | null
          game_version: string | null
          id: string | null
          image_url: string | null
          is_public: boolean | null
          like_count: number | null
          liked_by_current_user: boolean | null
          meta: string[] | null
          tags: Json[] | null
          title: string | null
          title_description_tsv: unknown | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
          user_handle: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "blueprint_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "blueprint_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "blueprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "collection_blueprint_cards"
            referencedColumns: ["blueprint_id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "my_blueprint_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_forked_from_id_fkey"
            columns: ["forked_from_id"]
            isOneToOne: false
            referencedRelation: "my_liked_blueprint_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_blueprint_cards: {
        Row: {
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
          created_at: string | null
          data_fetched_at: string | null
          game_version: string | null
          id: string | null
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
          created_at: string | null
          data_fetched_at: string | null
          game_version: string | null
          id: string | null
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
      [_ in never]: never
    }
    Enums: {
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
