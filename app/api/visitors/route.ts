import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

/**
 * GET /api/visitors
 * Returns the total count of unique visitor sessions
 */
export async function GET() {
  try {
    await dbConnect();
    
    // Count unique sessions
    const count = await Visitor.countDocuments();
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor count', count: 0 },
      { status: 500 }
    );
  }
}

/**
 * POST /api/visitors
 * Records a new visitor session with details
 * Expects: { sessionId: string, pathname?: string }
 */
export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { sessionId, pathname } = body;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }
    
    // Check if this session already exists
    const existingVisitor = await Visitor.findOne({ sessionId });
    
    if (existingVisitor) {
      // Session already counted, just return the current count
      const count = await Visitor.countDocuments();
      return NextResponse.json({ count, alreadyCounted: true });
    }
    
    // Get request headers for additional data
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || undefined;
    const referrer = headersList.get('referer') || undefined;
    
    // Get IP address (works with Vercel)
    const forwarded = headersList.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : 
                      headersList.get('x-real-ip') || undefined;
    
    // Create new visitor record
    await Visitor.create({
      sessionId,
      userAgent,
      ipAddress,
      referrer,
      pathname,
      timestamp: new Date(),
    });
    
    // Get updated count
    const count = await Visitor.countDocuments();
    
    return NextResponse.json({ count, alreadyCounted: false });
  } catch (error) {
    console.error('Error recording visitor:', error);
    return NextResponse.json(
      { error: 'Failed to record visitor' },
      { status: 500 }
    );
  }
}
