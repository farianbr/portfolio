import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    image: {
      type: 'string',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('blog/', ''),
    },
    readingTime: {
      type: 'string',
      resolve: (post) => readingTime(post.body.raw).text,
    },
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath.replace('blog/', '')}`,
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    image: {
      type: 'string',
    },
    imageLaptopView: {
      type: 'string',
    },
    imageMultiView: {
      type: 'string',
    },
    github: {
      type: 'string',
    },
    demo: {
      type: 'string',
    },

    /* ---- Case-study fields -------------------------------------------------
     * A project with `caseStudy: true` renders the structured template: spec
     * strip, features, annotated walkthrough, stack. Projects without these
     * fields fall back to the plain MDX write-up, so the ones that haven't
     * been migrated yet keep working.
     */
    caseStudy: {
      type: 'boolean',
      default: false,
    },
    /**
     * Display position, lowest first. Strongest work leads regardless of when
     * it was built — a recruiter reads the first two and leaves. Anything
     * without an explicit order falls to the end, newest first.
     */
    order: {
      type: 'number',
      default: 999,
    },
    /** One line, in my own words — the thing the description can't be. */
    tagline: {
      type: 'string',
    },
    /** e.g. "Solo — product, client, server, schema" */
    role: {
      type: 'string',
    },
    timeline: {
      type: 'string',
    },
    /** Free text: "Live", "Archived", "In progress". */
    status: {
      type: 'string',
    },
    /** [{ group, items[] }] */
    stack: {
      type: 'json',
    },
    /** [{ name, detail }] — the feature and the mechanism behind it. */
    features: {
      type: 'json',
    },
    /** [{ src, alt, caption, note, span, frame, ratio }] */
    gallery: {
      type: 'json',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (project) => project._raw.flattenedPath.replace('projects/', ''),
    },
    url: {
      type: 'string',
      resolve: (project) =>
        `/projects/${project._raw.flattenedPath.replace('projects/', '')}`,
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
