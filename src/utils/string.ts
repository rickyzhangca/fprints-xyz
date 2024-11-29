export const optionallyRemoveTrailingSlash = (str: string) => {
  if (!str || str.length === 0 || !str.endsWith('/')) return str;
  return str.slice(0, -1);
};
