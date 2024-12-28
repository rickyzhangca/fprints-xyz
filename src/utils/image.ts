export const getImageWidthFromFile = async (file: File): Promise<number> => {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  return new Promise(resolve => {
    img.onload = () => resolve(img.width);
  });
};

export const getImageWidthFromUrl = async (url: string): Promise<number> => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img.width);
    img.onerror = () => reject(new Error('Failed to load image'));
  });
};
