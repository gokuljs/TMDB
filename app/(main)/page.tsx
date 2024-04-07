'use client';
import { Movie } from '@/lib/Models/movie';
import getYear from '@/lib/getYear';
import http from '@/lib/http';
import Api from '@/lib/http';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import { Cell } from './_components/GridCell';

export default function Home(): JSX.Element {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<any>(null);
  const [columnCount, setColumnCount] = useState<number>(6); // Default column count
  const [dimension, setDimension] = useState({
    height: 0,
    width: 0,
  });
  const lastScrollTopRef = useRef(0); // Ref to store the last scroll position

  const fetchData = async (page: number) => {
    const response = await http.get(`movie/popular?language=en-US&page=${page}`);
    return response.data.results;
  };

  useEffect(() => {
    const handleResize = () => {
      // Determine the number of columns based on the window width
      if (window.innerWidth >= 1200) {
        setColumnCount(6);
      } else if (window.innerWidth >= 992) {
        setColumnCount(4);
      } else if (window.innerWidth >= 768) {
        setColumnCount(3);
      } else if (window.innerWidth >= 576) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    // Call handleResize initially and on window resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const scrollContainer = document.getElementsByClassName('fixedGrid')[0];
    if (!scrollContainer) return;
    const handleScroll = async () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      console.log('scroll');
      const isForwardScroll = scrollTop > lastScrollTopRef.current;
      if (isForwardScroll && scrolledPercentage > 90) {
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

  useEffect(() => {
    if (!scrollContainerRef || !scrollContainerRef.current) return;
    const scrollContainer = scrollContainerRef.current;
    const { height, width } = scrollContainer.getBoundingClientRect();
    setDimension({ height, width });
  }, []);

  return (
    <div ref={scrollContainerRef} className="w-[100vw] h-full flex">
      <Grid
        className="container fixedGrid"
        columnCount={columnCount}
        columnWidth={193 + 30} // Fixed column width
        height={dimension.height}
        rowCount={Math.ceil(data.length / columnCount)}
        rowHeight={355 + 30}
        width={dimension.width}
        itemData={{ data, columnCount }}
        ref={gridContainerRef}
      >
        {Cell}
      </Grid>
    </div>
  );
}
