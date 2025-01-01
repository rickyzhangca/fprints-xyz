import { IBlueprintWrapper } from '..';
import { encodeBase64String } from './base64-string';
import { cleanUpLabel } from './cleanup-label';
import { BlueprintType, getBlueprintType } from './get-type';

type Item = {
  type: BlueprintType;
  depth: number;
  label: string;
  path: string;
  value: string;
};

export function getFlatBlueprintList(
  data: IBlueprintWrapper,
  depth = 0,
  path = ''
): Item[] {
  const tree: Item[] = [];
  const type = getBlueprintType(data);

  if (type === 'blueprint_book' && data.blueprint_book) {
    const { label } = cleanUpLabel(data.blueprint_book.label ?? 'Untitled');
    const currentPath = path ? `${path}/book` : 'book';
    tree.push({
      depth,
      label,
      path: currentPath,
      type: 'blueprint_book',
      value: encodeBase64String(data),
    });

    // Recursively process each blueprint in the book
    data.blueprint_book.blueprints.forEach(
      (blueprint: IBlueprintWrapper, index: number) => {
        tree.push(
          ...getFlatBlueprintList(
            blueprint,
            depth + 1,
            `${currentPath}/${index}`
          )
        );
      }
    );
  } else if (type === 'blueprint' && data.blueprint) {
    const { label } = cleanUpLabel(data.blueprint.label ?? 'Untitled');
    tree.push({
      depth,
      label,
      path: path ? `${path}/blueprint` : 'blueprint',
      type: 'blueprint',
      value: encodeBase64String(data),
    });
  } else if (type === 'upgrade_planner' && data.upgrade_planner) {
    tree.push({
      depth,
      label: data.upgrade_planner.label ?? 'Upgrade Planner',
      path: path ? `${path}/upgrade_planner` : 'upgrade_planner',
      type: 'upgrade_planner',
      value: encodeBase64String(data),
    });
  } else if (type === 'deconstruction_planner' && data.deconstruction_planner) {
    tree.push({
      depth,
      label: data.deconstruction_planner.label ?? 'Deconstruction Planner',
      path: path ? `${path}/deconstruction_planner` : 'deconstruction_planner',
      type: 'deconstruction_planner',
      value: encodeBase64String(data),
    });
  }

  return tree;
}
