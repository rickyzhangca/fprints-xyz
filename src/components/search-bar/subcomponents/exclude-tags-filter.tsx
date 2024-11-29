import { TagCombobox } from '@/components/tag-combobox';

interface ExcludeTagsFilterProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const ExcludeTagsFilter = ({
  tags,
  setTags,
}: ExcludeTagsFilterProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm text-steel-300">Do not have these tags</p>
      <TagCombobox
        className="bg-steel-300 hover:bg-steel-200 active:bg-steel-300"
        value={tags}
        onChange={setTags}
        placeholder="Any tag"
      />
    </div>
  );
};
