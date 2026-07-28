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

  /* Under a phone frame there's no room for a margin note beside the text, so
     the caption stays a single column whatever the viewport is doing. */
  const narrow = shot.frame === 'phone';

  return (
    <figcaption
      className={`mt-2.5 flex flex-col gap-2 ${
        narrow ? '' : 'sm:flex-row sm:items-start sm:justify-between sm:gap-8'
      }`}
    >
      {shot.caption && (
        <p className="max-w-[62ch] text-[0.85rem] leading-[1.6] text-muted">
          <RichText text={shot.caption} />
        </p>
      )}
      {shot.note && (
        <p
          className={`hand shrink-0 -rotate-1 text-lg leading-tight text-accent ${
            narrow ? '' : 'sm:pt-0.5 sm:text-right'
          }`}
        >
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
    <section className="container-wide py-8 md:py-10">
      <Reveal className="mx-auto max-w-5xl">
        <p className="eyebrow mb-1.5">a look around</p>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          What it looks like in use
        </h2>
      </Reveal>

      <div className="mx-auto mt-5 max-w-5xl space-y-7 md:space-y-9">
        {rows.map((row, rowIndex) => (
          <Reveal key={row[0].src} delay={0.05}>
            {row.length === 2 ? (
              <div className="grid gap-8 md:grid-cols-2 md:gap-6">
                {row.map((shot) => (
                  /* A phone shot is much narrower than its column, so the
                     figure narrows with it — otherwise the caption runs the
                     full column and reads as belonging to nothing. */
                  <figure
                    key={shot.src}
                    className={
                      shot.frame === 'phone' ? 'mx-auto w-full max-w-[320px]' : ''
                    }
                  >
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
