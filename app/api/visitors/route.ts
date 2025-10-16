import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'visitors.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read visitor count
function readVisitorCount(): number {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const json = JSON.parse(data);
      return json.count || 0;
    }
  } catch (error) {
    console.error('Error reading visitor count:', error);
  }
  return 0;
}

// Write visitor count
function writeVisitorCount(count: number) {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count, lastUpdated: new Date().toISOString() }));
  } catch (error) {
    console.error('Error writing visitor count:', error);
  }
}

export async function GET() {
  const count = readVisitorCount();
  return NextResponse.json({ count });
}

export async function POST() {
  let count = readVisitorCount();
  count += 1;
  writeVisitorCount(count);
  return NextResponse.json({ count });
}
