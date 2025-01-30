import { NextResponse } from "next/server";
import { Redis } from '@upstash/redis';
import { notFound } from "next/navigation";

const redis = Redis.fromEnv();

export async function GET() {
    let result
    try {
        result = await redis.get("item") as ({item?: string});
    } catch (e) {
        console.warn(e);
    }

    if (!result || !result.item) {
        notFound();
    }

    return NextResponse.json(result); 
}
