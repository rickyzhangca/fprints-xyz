import cdnData from '@/data/cdn.json';
import componentsData from '@/data/components.json';
export type CdnData = Record<string, string[]>;
export { cdnData };

export type ComponentsData = Record<string, string[][]>;
export { componentsData };

    export * from './swappables';

