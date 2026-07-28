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
    <section className="container-wide py-8 md:py-10">
      <Reveal>
        <p className="eyebrow mb-1.5">what&apos;s in it</p>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Features</h2>
      </Reveal>

      <dl className="mt-5 grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.name} delay={Math.min(index, 4) * 0.03}>
            <div className="border-t-2 border-line/20 py-3">
              <dt className="font-display text-base text-ink md:text-lg">
                {feature.name}
              </dt>
              <dd className="mt-1 max-w-[52ch] text-[0.85rem] leading-[1.6] text-muted">
                <RichText text={feature.detail} />
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
