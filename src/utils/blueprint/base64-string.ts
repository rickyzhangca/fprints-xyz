import Pako from 'pako';

export const decodeBase64String = (string: string) => {
  if (string.length <= 2) return null;
  const decoded = atob(string.slice(1));
  const uint8Array = new Uint8Array(
    decoded.split('').map(c => c.charCodeAt(0))
  );
  return JSON.parse(Pako.inflate(uint8Array, { to: 'string' }));
};

export const encodeBase64String = (obj: unknown) => {
  const compressed = Pako.deflate(JSON.stringify(obj), { level: 9 });
  const array = Array.from(compressed);
  return '0' + btoa(String.fromCharCode.apply(null, array));
};
