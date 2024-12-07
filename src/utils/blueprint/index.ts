import {
  decodeBase64String,
  encodeBase64String,
} from '@/utils/blueprint/base64-string';
import { cleanUpLabel } from '@/utils/blueprint/cleanup-label';
import {
  ComponentCounts,
  countComponents,
} from '@/utils/blueprint/count-components';
import { getComponents } from '@/utils/blueprint/get-components';
import { getGameVersion } from '@/utils/blueprint/get-game-version';
import { getBlueprintType } from '@/utils/blueprint/get-type';
import { recommendTags } from '@/utils/blueprint/recommend-tags';
import { swap } from '@/utils/blueprint/swap';
import { validateJson } from '@/utils/blueprint/validate-json';
import { getSwappableMap } from './get-swappable-map';

export const BlueprintUtils = {
  Analysis: {
    countComponents,
    getComponents,
    validateJson,
    getGameVersion,
    recommendTags,
    cleanUpLabel,
    getBlueprintType,
  },
  Conversion: {
    encodeBase64String,
    decodeBase64String,
  },
  Swapping: {
    getSwappableMap,
    swap,
  },
};

export * from './types';
export type { ComponentCounts };
