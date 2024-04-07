import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { fetchData } from '../getMovies';
import { Movie } from '../Models/movie';

const useInfiniteScroll = (page: number, setPage: Dispatch<SetStateAction<number>>, setData: Dispatch<SetStateAction<Movie[]>>, loading: boolean) => {
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const scrollContainer = document.getElementsByClassName('fixedGrid')[0];
    if (!scrollContainer) return;

    const handleScroll = async () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      const isForwardScroll = scrollTop > lastScrollTopRef.current;
      if (isForwardScroll && scrolledPercentage > 50) {
        const response = await fetchData(page + 1);
        setPage((page) => page + 1);
        setData((data) => [...data, ...response]);
      }

      lastScrollTopRef.current = scrollTop;
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [page, loading]);
};

export default useInfiniteScroll;
