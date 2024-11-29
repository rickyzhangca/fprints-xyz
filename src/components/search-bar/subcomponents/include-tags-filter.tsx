import { TagCombobox } from '@/components/tag-combobox';

interface IncludeTagsFilterProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const IncludeTagsFilter = ({
  tags,
  setTags,
}: IncludeTagsFilterProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm text-steel-300">Have these tags</p>
      <TagCombobox
        className="bg-steel-300 hover:bg-steel-200 active:bg-steel-300"
        value={tags}
        onChange={setTags}
        placeholder="Any tag"
      />
    </div>
  );
};
