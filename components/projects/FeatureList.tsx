import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/projects/RichText';
import type { Feature } from '@/lib/projects';

/**
 * The whole "what it is" of a project, in one pass.
 *
 * Every entry is a name plus the mechanism behind it — "one selection model"
 * is a claim, "rows in one table, so a marquee catches mixed types" is the
 * reason to believe it. A feature without its mechanism is the line any
 * product page could write, so it doesn't go in.
 */
export default function FeatureList({ features }: { features: Feature[] }) {
  if (features.length === 0) return null;

  return (
    <section className="container-wide py-10 md:py-14">
      <Reveal>
        <p className="eyebrow mb-2">what&apos;s in it</p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">Features</h2>
      </Reveal>

      <dl className="mt-8 grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.name} delay={Math.min(index, 4) * 0.03}>
            <div className="border-t-2 border-line/20 py-4">
              <dt className="font-display text-lg text-ink md:text-xl">
                {feature.name}
              </dt>
              <dd className="mt-1.5 max-w-[52ch] text-[0.9rem] leading-[1.65] text-muted">
                <RichText text={feature.detail} />
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
