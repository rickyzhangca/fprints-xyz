export const getRandomBackground = () => {
  // Generate colors within a moderate brightness range
  // Min value 50 (0x32) to avoid too dark
  // Max value 180 (0xB4) to avoid too bright
  const r = Math.floor(Math.random() * (180 - 50) + 50);
  const g = Math.floor(Math.random() * (180 - 50) + 50);
  const b = Math.floor(Math.random() * (180 - 50) + 50);

  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  );
};

export const getForeground = (background: string) => {
  const r = parseInt(background.slice(1, 3), 16);
  const g = parseInt(background.slice(3, 5), 16);
  const b = parseInt(background.slice(5, 7), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#ffffff';
};
