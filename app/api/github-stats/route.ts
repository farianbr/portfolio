import { NextRequest, NextResponse } from 'next/server';

// In-memory cache to store fetched images
const imageCache = new Map<string, { data: Buffer; timestamp: number; contentType: string }>();

// Cache duration: 24 hours
const CACHE_DURATION = 3600000 * 24;

// Fallback image duration: 30 days if API fails
const FALLBACK_DURATION = 86400000 * 30;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type'); // 'streak' or 'chart'
  const theme = searchParams.get('theme') || 'light';

  if (!type) {
    return NextResponse.json({ error: 'Type parameter is required' }, { status: 400 });
  }

  const username = 'farianbr';
  let imageUrl: string;

  // Construct the appropriate URL based on type and theme.
  //
  // There used to be a `stats` card from github-readme-stats.vercel.app. That
  // deployment is paused indefinitely (it answers DEPLOYMENT_PAUSED, not a
  // transient 5xx), so the card was removed rather than left spinning.
  switch (type) {
    case 'streak':
      imageUrl =
        theme === 'light'
          ? `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=default&hide_border=true&background=00000000&ring=a9432b&fire=a9432b&currStreakLabel=7a6e5f&sideLabels=7a6e5f&currStreakNum=26211b&sideNums=26211b&dates=7a6e5f`
          : `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=00000000&ring=d87c52&fire=d87c52&currStreakLabel=ebe2d1&sideLabels=ebe2d1&currStreakNum=ebe2d1&sideNums=ebe2d1&dates=9a8e7a`;
      break;
    case 'chart':
      imageUrl =
        theme === 'light'
          ? `https://ghchart.rshah.org/a9432b/${username}`
          : `https://ghchart.rshah.org/d87c52/${username}`;
      break;
    default:
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  const cacheKey = `${type}-${theme}`;
  const now = Date.now();

  // Check if we have a valid cached version
  const cached = imageCache.get(cacheKey);
  if (cached) {
    const age = now - cached.timestamp;
    
    // If cache is still fresh, return it
    if (age < CACHE_DURATION) {
      return new NextResponse(cached.data as any, {
        headers: {
          'Content-Type': cached.contentType,
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
          'X-Cache': 'HIT',
        },
      });
    }
  }

  // Try to fetch fresh data from the third-party API
  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get('content-type') || 'image/svg+xml';

    // Update cache with fresh data
    imageCache.set(cacheKey, {
      data: buffer,
      timestamp: now,
      contentType,
    });

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error(`Failed to fetch GitHub stats (${type}, ${theme}):`, error);

    // If fetch fails, try to return cached version even if expired
    if (cached) {
      const age = now - cached.timestamp;
      
      // Only use fallback if it's not too old (24 hours)
      if (age < FALLBACK_DURATION) {
        return new NextResponse(cached.data as any, {
          headers: {
            'Content-Type': cached.contentType,
            'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
            'X-Cache': 'STALE',
          },
        });
      }
    }

    // If no cache available or too old, return error
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats and no cache available' },
      { status: 503 }
    );
  }
}
