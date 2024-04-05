'use client';
import Api from '@/lib/http';

export default function Home(): JSX.Element {
  Api.get('https://api.themoviedb.org/3/movie/popular?api_key=0b922df2b65c4111f64b98801dc7e4d7&language=en-US')
    .then((response) => {
      console.log(response.data); // Now accessing response.data
    })
    .catch((error) => {
      console.log(error);
    });

  console.log('hello', 'ssss');

  return <main className="h-full w-full">Home sdsd</main>;
}
