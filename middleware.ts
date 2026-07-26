import { NextResponse, type NextRequest } from 'next/server';

/**
 * Projects used to be one master/detail page at `/projects?project=slug`, and
 * that shape was in the sitemap. Now each project has its own route.
 *
 * This lives in middleware rather than `redirects()` in next.config so the
 * query string doesn't ride along to the new URL (config redirects forward
 * unmatched params, which would leave a duplicate `?project=` variant of every
 * case study), and rather than in the page so it's a real 308 for crawlers
 * and `/projects` stays statically rendered.
 */
export function middleware(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('project');

  if (slug) {
    const url = new URL(`/projects/${slug}`, request.url);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/projects',
};
