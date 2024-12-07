import type { Database } from './types';

export type IBlueprint = Database['public']['Tables']['blueprints']['Row'];

export type IBlueprintCard =
  Database['public']['Views']['blueprint_card']['Row'];

export type IBlueprintDetails =
  Database['public']['Views']['blueprint_details']['Row'];

export type IProfile = Database['public']['Tables']['user_profiles']['Row'];

export type ICollection = Database['public']['Tables']['collections']['Row'];

export type ICollectionWithBlueprintCount =
  Database['public']['Tables']['collections']['Row'] & {
    blueprint_count: { count: number };
  };

export type ITag = Database['public']['Tables']['tags']['Row'];

export const SupabaseEdgeFunctions = {
  proxyFactorioBinApi: 'fprints-proxy-factorio-bin-api',
  proxyFactorioSchoolApi: 'fprints-proxy-factorio-school-api',
  bunnyUpload: 'fprints-bunny',
  getImage: 'fprints-get-image',
} as const;
