import { allProjects, type Project } from '@/.contentlayer/generated';

/**
 * Typed access to the case-study fields. Contentlayer types `json` fields as
 * `any`, so the shapes live here instead — one place to change when the MDX
 * frontmatter grows, and one place the components can trust.
 */

export type StackGroup = {
  group: string;
  items: string[];
};

export type Feature = {
  name: string;
  /** What it is *and* how it works — one sentence, mechanism included. */
  detail: string;
};

export type Shot = {
  src: string;
  alt: string;
  caption?: string;
  /** Handwritten margin annotation. Use sparingly — one every few shots. */
  note?: string;
  span?: 'full' | 'half';
  frame?: 'browser' | 'phone';
  /** Override the frame's default aspect ratio, e.g. "144 / 94". */
  ratio?: string;
};

export function publishedProjects(): Project[] {
  return allProjects
    .filter((project) => project.published)
    .sort(
      (a, b) =>
        a.order - b.order ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function findProject(slug: string): Project | undefined {
  return publishedProjects().find((project) => project.slug === slug);
}

/**
 * Previous/next in the same order the index uses, so the footer nav matches
 * what the visitor just scrolled past. Wraps, so there's always somewhere to go.
 */
export function projectNeighbours(slug: string) {
  const projects = publishedProjects();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1 || projects.length < 2) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

export const stackOf = (project: Project): StackGroup[] => project.stack ?? [];
export const featuresOf = (project: Project): Feature[] =>
  project.features ?? [];
export const galleryOf = (project: Project): Shot[] => project.gallery ?? [];

/** Flat stack list — for the compact chips on index cards. */
export function stackSummary(project: Project, limit = 4): string[] {
  const flat = stackOf(project).flatMap((group) => group.items);
  return (flat.length > 0 ? flat : [...project.tags]).slice(0, limit);
}
