import { notFound } from "next/navigation";

export default async function Home() {
  const url = `https://${process.env.VERCEL_URL}/get-item`;
  console.log(`Fetch value from ${url}`);
  
  const res = await fetch(url, {
    cache: 'force-cache',
    next: {
      tags: ['my-cachetag'],
      revalidate: false
    }
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  return <span>{data.item}</span>
}
