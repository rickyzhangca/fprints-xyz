import { z } from 'zod';

const IMGUR_MATCHER = /imgur\.com\/([a-zA-Z0-9]+)/;

const imgurUrlSchema = z.string().refine(url => IMGUR_MATCHER.test(url), {
  message: 'Invalid Imgur URL format',
});

export const getImgurSrcUrl = (url: string) => {
  const result = imgurUrlSchema.safeParse(url);
  if (!result.success) return url;

  const imgurId = url.match(IMGUR_MATCHER)?.[1];
  return `https://i.imgur.com/${imgurId}.webp`;
};

export const getImgurSrcUrlFromId = (id: string) => {
  return `https://i.imgur.com/${id}.webp`;
};
