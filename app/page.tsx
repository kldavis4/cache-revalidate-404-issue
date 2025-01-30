import { notFound } from "next/navigation";

export default async function Home() {
  const url = `https://cache-revalidate-404-issue-zeta.vercel.app/get-item`;
  console.log(`Fetch value from ${url}`);

  let data = null;

  try {
    const res = await fetch(url, {
      cache: 'force-cache',
      next: {
        tags: ['my-cachetag']
      }
    });

    if (res.ok) {
      data = await res.json();
    } else {
      console.warn(`Fetch failed with status: ${res.status} ${res.statusText}`);
    }
  } catch (e) {
    console.error(`Fetch error: ${e.message}`);
  }

  // If data is null, it means fetch failed.
  // Use notFound() if you want to indicate a 404 scenario.
  if (!data) {
    notFound(); // This will trigger a 404 during both build and runtime.
  }

  return <span>{data ? data.item : 'Loading...'}</span>;
}

export async function generateStaticParams() {
  return [];
}