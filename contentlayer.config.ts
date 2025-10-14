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
    github: {
      type: 'string',
    },
    demo: {
      type: 'string',
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
