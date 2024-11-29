import { BlueprintUtils, IBlueprintWrapper } from '@/utils';

export const decodeVersion = (version: string) => {
  const versionBits = BigInt(version);
  const major = Number((versionBits >> 48n) & 0xffffn);
  const minor = Number((versionBits >> 32n) & 0xffffn);
  const patch = Number((versionBits >> 16n) & 0xffffn);
  const dev = Number(versionBits & 0xffffn);
  return { major, minor, patch, dev };
};

export const getGameVersion = (
  range: 'major' | 'minor' | 'patch' | 'dev',
  blueprint: IBlueprintWrapper
) => {
  const type = BlueprintUtils.Analysis.getBlueprintType(blueprint);
  const version =
    type === 'blueprint_book'
      ? blueprint.blueprint_book?.version
      : type === 'blueprint'
        ? blueprint.blueprint?.version
        : type === 'deconstruction_planner'
          ? blueprint.deconstruction_planner?.version
          : type === 'upgrade_planner'
            ? blueprint.upgrade_planner?.version
            : '';
  if (!version) return 'Unknown';

  const { major, minor, patch, dev } = decodeVersion(version);

  return range === 'major'
    ? `${major}`
    : range === 'minor'
      ? `${major}.${minor}`
      : range === 'patch'
        ? `${major}.${minor}.${patch}`
        : `${major}.${minor}.${patch}${dev > 0 ? `-dev.${dev}` : ''}`;
};
