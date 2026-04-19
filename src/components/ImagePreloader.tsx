import { useEffect } from 'react';
import { getProjects } from '@/lib/content';

/**
 * Preloads every image referenced across project content as soon as the app boots.
 * This makes navigation feel instant — no flash of empty images on detail pages.
 */
const collectImageUrls = (): string[] => {
  const urls = new Set<string>();
  const projects = getProjects();
  for (const p of projects) {
    if (typeof p.cover_image === 'string') urls.add(p.cover_image);
    if (typeof p.thumbnail === 'string') urls.add(p.thumbnail);
    if (typeof p.preview_image === 'string') urls.add(p.preview_image);
    const arrays = [p.images, p.gallery, p.screenshots, p.files].filter(Array.isArray);
    for (const arr of arrays) {
      for (const item of arr) {
        if (typeof item === 'string') urls.add(item);
        else if (item && typeof item === 'object') {
          if (typeof item.cover === 'string') urls.add(item.cover);
          if (typeof item.image === 'string') urls.add(item.image);
          if (typeof item.url === 'string' && /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(item.url)) urls.add(item.url);
        }
      }
    }
  }
  return Array.from(urls);
};

const ImagePreloader = () => {
  useEffect(() => {
    const urls = collectImageUrls();
    urls.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, []);
  return null;
};

export default ImagePreloader;
