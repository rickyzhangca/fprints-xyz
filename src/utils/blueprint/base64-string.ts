import Pako from 'pako';

export const decodeBase64String = (string: string) => {
  if (string.length <= 2) return null;
  try {
    const decoded = atob(string.slice(1));
    const uint8Array = new Uint8Array(
      decoded.split('').map(c => c.charCodeAt(0))
    );
    return JSON.parse(Pako.inflate(uint8Array, { to: 'string' }));
  } catch (error) {
    console.error('Failed to decode blueprint:', error);
    return null;
  }
};

export const encodeBase64String = (obj: unknown) => {
  try {
    const compressed = Pako.deflate(JSON.stringify(obj), { level: 9 });

    // Convert the compressed data to a string in chunks to avoid stack overflow
    const chunkSize = 8192;
    let result = '';
    for (let i = 0; i < compressed.length; i += chunkSize) {
      const chunk = compressed.slice(i, i + chunkSize);
      result += String.fromCharCode.apply(null, chunk as unknown as number[]);
    }

    return '0' + btoa(result);
  } catch (error) {
    console.error('Failed to encode blueprint:', error);
    return '';
  }
};
