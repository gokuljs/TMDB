'use client';
import { Movie } from '@/lib/Models/movie';
import getYear from '@/lib/getYear';
import http from '@/lib/http';
import Api from '@/lib/http';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

export default function Home(): JSX.Element {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await http.get('movie/popular?language=en-US&page=1');
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetch();
  }, []);

  console.log(data);
  return (
    <div className="overflow-y-auto w-[100vw] h-full ">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data.length > 0 &&
            data.map((item, index) => (
              <div key={index} title={item.title} className="bg-white rounded-lg overflow-hidden shadow-lg w-[193px] h-[355px] flex flex-col">
                <div className="w-full h-[289px] relative">
                  <Image className="w-full" src={`${IMAGE_URL}${item.poster_path}`} layout="fill" objectFit="cover" alt="movie title" />
                </div>
                <div className="p-4 bg-[#050E12] h-[calc(355px - 289px)] w-full flex flex-col">
                  <p className="text-[#B6B6B6] text-lg font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">{item.title}</p>
                  <p className="text-[#828282] text-sm">{getYear(item.release_date)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
