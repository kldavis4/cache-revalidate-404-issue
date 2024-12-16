import { NextRequest, NextResponse } from "next/server";
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(request: NextRequest) {
    const item = (await request.json()) as { item?: string };

    const result = await redis.set("item", item);
    
    return NextResponse.json({ status: 200, set: result, now: Date.now() });
}
