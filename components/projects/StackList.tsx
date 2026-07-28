import Reveal from '@/components/ui/Reveal';
import type { StackGroup } from '@/lib/projects';

/**
 * The stack, grouped by where it runs rather than dumped as a wall of logos.
 * Reading it top to bottom should tell you the shape of the system: what's on
 * the canvas, what's on the server, what holds the data.
 */
export default function StackList({ stack }: { stack: StackGroup[] }) {
  if (stack.length === 0) return null;

  return (
    <section className="container-wide py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow mb-1.5">what it&apos;s made of</p>
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            The stack
          </h2>
        </Reveal>

        <dl className="mt-5">
          {stack.map((group, index) => (
            <Reveal key={group.group} delay={index * 0.04}>
              <div className="grid gap-1.5 border-t-2 border-line/20 py-3 sm:grid-cols-4 sm:gap-8">
                <dt className="label pt-1 !text-ink/70">{group.group}</dt>
                <dd className="sm:col-span-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="chip !px-2.5 !py-0.5 !text-[0.7rem] font-mono"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
