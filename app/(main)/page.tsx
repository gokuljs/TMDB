'use client';
import Api from '@/lib/http';

export default function Home(): JSX.Element {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  return <main className="h-full w-full">Home sdsd</main>;
}
