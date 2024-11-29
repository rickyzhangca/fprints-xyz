export const cleanUpLabel = (
  label: string
): {
  label: string;
  signal?: string;
} => {
  if (!label) return { label: 'Untitled', signal: undefined };

  const signal = label.match(/\[.*?=(.*?)\]/)?.[1];

  return {
    label: label.replace(/\[.*?\]/g, ''),
    signal,
  };
};
