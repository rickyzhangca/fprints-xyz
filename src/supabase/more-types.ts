import type { Database } from './types';

export type IBlueprint = Database['public']['Tables']['blueprints']['Row'];

export type IBlueprintCard =
  Database['public']['Views']['blueprint_card']['Row'];

export type IBlueprintDetails =
  Database['public']['Views']['blueprint_details']['Row'];

export type IProfile = Database['public']['Tables']['user_profiles']['Row'];

export type ICollection = Database['public']['Tables']['collections']['Row'];

export type ITag = Database['public']['Tables']['tags']['Row'];
