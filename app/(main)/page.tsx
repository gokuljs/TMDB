'use client';
import { Movie } from '@/lib/Models/movie';
import getYear from '@/lib/getYear';
import http from '@/lib/http';
import Api from '@/lib/http';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

export default function Home(): JSX.Element {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0); // Ref to store the last scroll position

  const fetchData = async (page: number) => {
    const response = await http.get(`movie/popular?language=en-US&page=${page}`);
    return response.data.results;
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(1);
        const secondResponse = await fetchData(2);
        setData([...response, ...secondResponse]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!scrollContainerRef || !scrollContainerRef.current) return;
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = async () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

      const isForwardScroll = scrollTop > lastScrollTopRef.current;
      if (isForwardScroll && scrolledPercentage > 50) {
        console.log('more than 60');
        const response = await fetchData(page + 1);
        setPage((page) => page + 1);
        setData((data) => {
          return [...data, ...response];
        });
      }

      lastScrollTopRef.current = scrollTop;
    };
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  return (
    <div ref={scrollContainerRef} className="overflow-y-auto w-[100vw] h-full ">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data.length > 0 &&
            data.map((item, index) => (
              <div
                key={item.id.toString() + index}
                title={item.title}
                className="bg-white rounded-lg overflow-hidden shadow-lg w-[193px] h-[355px] flex flex-col"
              >
                <div className="w-full h-[289px] relative">
                  <Image
                    loading="eager"
                    className="w-full object-cover"
                    src={`${IMAGE_URL}${item.poster_path}`}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    alt="movie title"
                  />
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
