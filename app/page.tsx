import { notFound } from "next/navigation";

export default async function Home() {
  const res = await fetch(`${process.env.HOSTNAME}/get-item`, {
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
