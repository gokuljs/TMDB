'use client';
import Api from '@/lib/http';

export default function Home(): JSX.Element {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjkyMmRmMmI2NWM0MTExZjY0Yjk4ODAxZGM3ZTRkNyIsInN1YiI6IjYxNmZjNzcyODk0ZWQ2MDAyMzJkZDM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YXtwPU-zalujlxG5BNPn5l4RxMDte4B6Dve5q8UIrb4',
    },
  };

  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  return <main className="h-full w-full">Home sdsd</main>;
}
