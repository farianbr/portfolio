# GitHub Stats Caching API

## Overview

This API route provides a robust caching solution for GitHub stats images from third-party services. It solves the problem of unreliable external API calls by implementing an intelligent caching strategy.

## Features

- **In-Memory Caching**: Images are cached for 1 hour to reduce API calls
- **Fallback Strategy**: If the third-party API fails, serves stale cache (up to 24 hours old)
- **Multiple Themes**: Supports both light and dark theme variants
- **HTTP Caching Headers**: Implements proper cache control for browsers and CDNs
- **Automatic Timeout**: 10-second timeout prevents hanging requests
- **Multiple Stats Types**: Supports stats, streak, and contribution chart

## Endpoints

### GET `/api/github-stats`

**Query Parameters:**
- `type` (required): The type of GitHub stats image
  - `stats`: GitHub profile statistics
  - `streak`: Commit streak information
  - `chart`: Contribution graph
- `theme` (optional): Theme variant (default: `light`)
  - `light`: Light theme
  - `dark`: Dark theme

**Examples:**
```
/api/github-stats?type=stats&theme=light
/api/github-stats?type=streak&theme=dark
/api/github-stats?type=chart&theme=light
```

## Cache Strategy

### 1. Fresh Cache (< 1 hour)
- Returns cached image immediately
- Cache-Control: `public, max-age=3600, stale-while-revalidate=86400`
- X-Cache: `HIT`

### 2. Expired Cache (1-24 hours)
- Attempts to fetch fresh data from third-party API
- On success: Updates cache and returns new image
- On failure: Returns stale cached version
- X-Cache: `MISS` (success) or `STALE` (fallback)

### 3. No Cache or Very Stale (> 24 hours)
- Attempts to fetch fresh data
- On failure: Returns 503 error

## Response Headers

- `Content-Type`: `image/svg+xml` or as returned by the source
- `Cache-Control`: Browser and CDN caching instructions
- `X-Cache`: Cache status indicator (`HIT`, `MISS`, or `STALE`)

## Error Handling

The API implements multiple layers of error handling:

1. **Request Validation**: Checks for required parameters
2. **Timeout Protection**: 10-second timeout on external requests
3. **Graceful Degradation**: Falls back to cached versions
4. **Error Logging**: Logs failures for debugging

## Benefits Over Direct API Calls

### Before (Direct External API)
- ❌ Slow page loads when API is slow
- ❌ Broken images when API is down
- ❌ Rate limiting issues
- ❌ No control over caching
- ❌ Multiple identical requests per page

### After (Caching Proxy)
- ✅ Fast page loads with cached images
- ✅ Always shows something (fallback to stale cache)
- ✅ Reduced API calls (shared cache)
- ✅ Controlled caching strategy
- ✅ Single request serves all visitors

## Alternative Solutions Considered

### 1. **Filesystem Caching** (Not Recommended)
Saving images to `public/images/` directory:
- ❌ Doesn't work with serverless (Vercel, Netlify)
- ❌ Requires manual cleanup
- ❌ More complex deployment
- ✅ Survives server restarts

### 2. **Database Caching** (Overkill)
Storing images in database:
- ❌ More complex setup
- ❌ Slower than memory cache
- ❌ Requires database for simple images
- ✅ Persists across deployments

### 3. **Current Solution: In-Memory Cache** (✅ Recommended)
- ✅ Simple implementation
- ✅ Fast access
- ✅ Works with serverless
- ✅ Automatic cleanup
- ⚠️ Cache lost on server restart (acceptable trade-off)

## Production Deployment

### Vercel (Recommended)
Works perfectly with Vercel's serverless functions. Each function instance maintains its own cache.

### Traditional Server
For long-running servers, consider using Redis or a similar distributed cache if you have multiple instances.

## Configuration

To change cache durations, modify these constants in `route.ts`:

```typescript
const CACHE_DURATION = 3600000;    // 1 hour (fresh cache)
const FALLBACK_DURATION = 86400000; // 24 hours (stale cache)
```

To change the GitHub username, update the `username` constant in the route handler.

## Monitoring

Check the `X-Cache` header to monitor cache performance:
- High `HIT` rate = Good performance
- High `STALE` rate = Third-party API issues
- High `MISS` rate = Cache duration too short or high traffic