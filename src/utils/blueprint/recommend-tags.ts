import { cdnData } from '@/data';
import { BlueprintUtils, IBlueprintWrapper } from '@/utils';

export const recommendTags = (blueprint: IBlueprintWrapper) => {
  const tags: string[] = [];
  if (Object.keys(blueprint).length === 0) return tags;

  const components = BlueprintUtils.Analysis.getComponents(blueprint);

  // base game - power
  if (
    [
      'nuclear-reactor',
      'uranium-235',
      'uranium-238',
      'uranium-ore-1',
      'uranium-ore-2',
      'uranium-ore-3',
      'uranium-ore',
      'uranium-processing',
    ].some(item => components.includes(item))
  )
    tags.push('power/nuclear');
  if (
    ['solar-panel-equipment', 'solar-panel'].some(item =>
      components.includes(item)
    )
  )
    tags.push('power/solar');
  if (components.includes('accumulator')) tags.push('power/accumulator');
  if (['steam-engine', 'boiler'].some(item => components.includes(item)))
    tags.push('power/steam');

  // base game - circuit
  if (components.includes('display-panel')) tags.push('circuit/indicator');
  if (components.includes('display-panel')) tags.push('circuit/counter');
  if (
    [
      'display-panel',
      'decider-combinator',
      'constant-combinator',
      'arithmetic-combinator',
      'selector-combinator',
    ].some(item => components.includes(item))
  )
    tags.push('circuit');

  // base game - railway
  if (
    components.includes('train-stop') &&
    ['loader', 'fast-loader', 'express-loader', 'turbo-loader'].some(item =>
      components.includes(item)
    )
  )
    tags.push('train-station');

  // base game - logistics
  if (
    [
      'logistic-chest-storage',
      'logistic-chest-requester',
      'logistic-chest-passive-provider',
      'logistic-chest-active-provider',
      'logistic-chest-buffer',
    ].some(item => components.includes(item))
  )
    tags.push('logistics/chest');

  // base game - beacon
  if (components.includes('beacon')) tags.push('production/beacon');

  // base game - planners
  if (
    ['upgrade-planner', 'deconstruction-planner'].some(item =>
      components.includes(item)
    )
  )
    tags.push('planner');

  // base game - circuit
  // TODO: analyze recipes instead of components
  if (components.includes('electronic-circuit')) tags.push('circuit/green');
  if (components.includes('advanced-circuit')) tags.push('circuit/red');
  if (components.includes('processing-unit')) tags.push('circuit/purple');

  // early return for v1 base game
  const version = BlueprintUtils.Analysis.getGameVersion('major', blueprint);
  if (version === '1') return [...new Set(tags)];

  // space age
  const spaceAgeComponents = cdnData['space-age'];
  if (spaceAgeComponents.some(item => components.includes(item)))
    tags.push('space-age');
  if (components.includes('space-platform-foundation'))
    tags.push('space-platform');
  if (components.includes('space-platform')) tags.push('space-platform');

  // space age - vulcanus
  if (
    [
      'foundry',
      'big-mining-drill',
      'turbo-loader',
      'turbo-splitter',
      'turbo-transport-belt',
      'turbo-underground-belt',
      'vulcanus-chimney-truncated',
      'vulcanus-chimney',
      'vulcanus',
      'molten-copper-from-lava',
      'molten-copper',
      'molten-iron-from-lava',
      'molten-iron',
      'concrete-from-molten-iron',
      'lava',
      'metallurgic-science-pack',
      'calcite',
      'calcite-1',
      'calcite-2',
      'calcite-3',
      'carbon',
      'tungsten-ore',
      'tungsten-ore-1',
      'tungsten-ore-2',
      'tungsten-ore-3',
      'tungsten-plate',
      'tungsten-carbide',
    ].some(item => components.includes(item))
  )
    tags.push('planet/vulcanus');

  // space age - fulgora
  if (
    [
      'scrap-1',
      'scrap-2',
      'scrap-3',
      'scrap-4',
      'scrap-5',
      'scrap',
      'holmium-ore',
      'holmium-plate',
      'holmium-solution',
      'supercapacitor',
      'superconductor',
      'electromagnetic-plant',
      'electromagnetic-science-pack',
      'lightning-collector',
      'lightning-rod',
      'lightning',
      'recycler',
      'recycling-top',
      'recycling',
      'tesla-ammo',
      'tesla-turret',
      'tesla',
      'teslagun',
      'fulgoran-ruin-attractor',
      'fulgoran-ruin-big',
      'fulgoran-ruin-colossal',
      'fulgoran-ruin-huge',
      'fulgoran-ruin-medium',
      'fulgoran-ruin-small',
      'fulgoran-ruin-stonehenge',
      'fulgoran-ruin-vault',
      'fulgurite-small',
      'fulgurite',
    ].some(item => components.includes(item))
  )
    tags.push('planet/fulgora');

  // space age - gleba
  if (
    [
      'agricultural-science-pack',
      'agricultural-tower',
      'artificial-jellynut-soil',
      'artificial-yumako-soil',
      'jelly',
      'jellynut-1',
      'jellynut-2',
      'jellynut-3',
      'jellynut-processing',
      'jellynut-seed-1',
      'jellynut-seed-2',
      'jellynut-seed-3',
      'jellynut-seed-4',
      'jellynut-seed',
      'jellynut',
      'jellystem',
      'overgrowth-jellynut-soil',
      'rocket-fuel-from-jelly',
      'wetland-jellynut',
      'wetland-yumako',
      'yumako-1',
      'yumako-2',
      'yumako-3',
      'yumako-mash',
      'yumako-processing',
      'yumako-seed-1',
      'yumako-seed-2',
      'yumako-seed-3',
      'yumako-seed-4',
      'yumako-seed',
      'yumako-tree',
      'yumako',
      'biter-spawner-corpse',
      'biter-spawner',
      'captive-biter-spawner',
      'capture-bot',
      'heating-tower',
      'biochamber',
      'biolab',
      'pentapod-egg-1',
      'pentapod-egg-2',
      'pentapod-egg-3',
      'pentapod-egg',
      'nutrients-from-bioflux',
      'nutrients-from-biter-egg',
      'nutrients-from-fish',
      'nutrients-from-spoilage',
      'nutrients-from-yumako-mash',
      'nutrients',
    ].some(item => components.includes(item))
  )
    tags.push('planet/gleba');

  // space age - aquilo
  if (
    [
      'lithium-brine',
      'lithium-iceberg-big',
      'lithium-plate',
      'lithium',
      'cryogenic-plant',
      'cryogenic-science-pack',
      'fusion-generator',
      'fusion-plasma',
      'fusion-power-cell',
      'fusion-reactor-equipment',
      'fusion-reactor',
      'railgun-ammo',
      'railgun-turret',
      'railgun',
      'quantum-processor',
    ].some(item => components.includes(item))
  ) {
    tags.push('planet/aquilo');
    tags.push('late-game');
  }

  // quality
  if (
    // TODO: analyze recipes instead of components
    ['quality-module-2', 'quality-module-3', 'quality-module'].some(item =>
      components.includes(item)
    )
  )
    tags.push('quality');

  // elevated rails
  const elevatedRailsComponents = cdnData['elevated-rails'];
  if (elevatedRailsComponents.some(item => components.includes(item))) {
    tags.push('elevated-rails');
    tags.push('tracks');
  }

  return [...new Set(tags)];
};
