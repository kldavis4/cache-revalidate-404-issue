import { NextResponse } from "next/server";
import { Redis } from '@upstash/redis';
import { notFound } from "next/navigation";

const redis = Redis.fromEnv();

export async function GET() {
    const result = await redis.get("item") as ({item?: string});
    
    if (!result || !result.item) {
        notFound();
    }

    return NextResponse.json(result); 
}
