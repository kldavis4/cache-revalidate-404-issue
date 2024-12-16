import { notFound } from "next/navigation";

export default async function Home() {
  const res = await fetch(`https://${process.env.VERCEL_URL}/get-item`, {
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
