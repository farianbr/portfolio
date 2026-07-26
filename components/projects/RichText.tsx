import { Fragment } from 'react';

/**
 * Renders the small amount of markup that case-study frontmatter needs:
 * `backticks` become inline code. Frontmatter prose talks about real
 * identifiers — `BoardItem`, `data.points`, `prisma migrate dev` — and those
 * read as noise in plain body text, but pulling every sentence into MDX just
 * to get one <code> back isn't worth it.
 */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <>
      {parts.map((part, index) => {
        const isCode =
          part.length > 2 && part.startsWith('`') && part.endsWith('`');

        return isCode ? (
          <code
            key={index}
            className="rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        );
      })}
    </>
  );
}
