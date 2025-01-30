import { notFound } from "next/navigation";

export default async function Home() {
  const url = `https://${process.env.VERCEL_URL}/get-item`;
  console.log(`Fetch value from ${url}`);

  let res
  try {
    res = await fetch(url, {
      cache: 'force-cache',
      next: {
        tags: ['my-cachetag']
      }
    });
  } catch (e) {
    console.error(e);
  }

  if (!res || !res.ok) {
    notFound();
    return
  }

  const data = await res.json();

  return <span>{data.item}</span>
}

export async function generateStaticParams() {
  return [];
}