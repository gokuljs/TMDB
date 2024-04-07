import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { fetchData } from '../getMovies';
import { Movie } from '../Models/movie';
import { useToast } from '@/components/ui/use-toast';

const useInfiniteScroll = (page: number, setPage: Dispatch<SetStateAction<number>>, setData: Dispatch<SetStateAction<Movie[]>>, loading: boolean) => {
  const lastScrollTopRef = useRef(0);
  const { toast } = useToast();

  useEffect(() => {
    const scrollContainer = document.getElementsByClassName('fixedGrid')[0];
    if (!scrollContainer) return;
    const handleScroll = async () => {
      // looking for scroll has travelled 80% then start adding  new data into the list
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      const isForwardScroll = scrollTop > lastScrollTopRef.current;
      if (isForwardScroll && scrolledPercentage > 50) {
        const response = await fetchData(page + 1);
        if (page + 1 >= 43447) {
          toast({
            title: 'End of List',
            description: 'No More Content Available',
            variant: 'destructive',
          });
          return;
        }
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
