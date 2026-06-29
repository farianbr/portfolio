import type { MetadataRoute } from 'next';
import { allProjects, allPosts } from '@/.contentlayer/generated';
import { siteConfig } from '@/lib/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const routes = ['', '/projects', '/blog', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const projects = allProjects
    .filter((p) => p.published)
    .map((p) => ({
      url: `${base}/projects?project=${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }));

  const posts = allPosts
    .filter((p) => p.published)
    .map((p) => ({
      url: `${base}${p.url}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }));

  return [...routes, ...projects, ...posts];
}
