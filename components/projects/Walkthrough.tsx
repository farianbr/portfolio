import Reveal from '@/components/ui/Reveal';
import Figure from '@/components/projects/Figure';
import RichText from '@/components/projects/RichText';
import type { Shot } from '@/lib/projects';

/**
 * The screenshot tour.
 *
 * Every caption has to say something a visitor couldn't get from looking —
 * what's underneath the thing on screen, or why it's built that way. A caption
 * that names the screen ("Dashboard") is a wasted one, so the walkthrough
 * carries the captions and never a title bar.
 */

/** Group consecutive half-width shots so they sit side by side. */
function toRows(shots: Shot[]): Shot[][] {
  return shots.reduce<Shot[][]>((rows, shot) => {
    const last = rows[rows.length - 1];

    if (shot.span === 'half' && last?.[0]?.span === 'half' && last.length < 2) {
      last.push(shot);
      return rows;
    }

    rows.push([shot]);
    return rows;
  }, []);
}

function Caption({ shot }: { shot: Shot }) {
  if (!shot.caption && !shot.note) return null;

  return (
    <figcaption className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      {shot.caption && (
        <p className="max-w-[62ch] text-[0.9rem] leading-[1.65] text-muted">
          <RichText text={shot.caption} />
        </p>
      )}
      {shot.note && (
        <p className="hand shrink-0 -rotate-1 text-xl leading-tight text-accent sm:pt-1 sm:text-right">
          {shot.note}
        </p>
      )}
    </figcaption>
  );
}

export default function Walkthrough({ shots }: { shots: Shot[] }) {
  if (shots.length === 0) return null;

  const rows = toRows(shots);

  return (
    <section className="container-wide py-10 md:py-14">
      <Reveal className="mx-auto max-w-5xl">
        <p className="eyebrow mb-2">a look around</p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          What it looks like in use
        </h2>
      </Reveal>

      <div className="mx-auto mt-8 max-w-5xl space-y-10 md:space-y-12">
        {rows.map((row, rowIndex) => (
          <Reveal key={row[0].src} delay={0.05}>
            {row.length === 2 ? (
              <div className="grid gap-8 md:grid-cols-2 md:gap-6">
                {row.map((shot) => (
                  <figure key={shot.src}>
                    <Figure
                      src={shot.src}
                      alt={shot.alt}
                      span="half"
                      frame={shot.frame}
                      ratio={shot.ratio}
                    />
                    <Caption shot={shot} />
                  </figure>
                ))}
              </div>
            ) : (
              <figure>
                <Figure
                  src={row[0].src}
                  alt={row[0].alt}
                  span="full"
                  frame={row[0].frame}
                  ratio={row[0].ratio}
                  priority={rowIndex === 0}
                />
                <Caption shot={row[0]} />
              </figure>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
