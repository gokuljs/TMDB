'use client';
import { Movie } from '@/lib/Models/movie';
import getYear from '@/lib/getYear';
import http from '@/lib/http';
import Api from '@/lib/http';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: Movie[];
}

export default function Home(): JSX.Element {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<any>(null);
  const [columnCount, setColumnCount] = useState(6); // Default column count
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

  const Cell: React.FC<CellProps> = ({ columnIndex, rowIndex, style, data }) => {
    // Calculate the index of your item based on rowIndex and columnIndex
    const index = rowIndex * columnCount + columnIndex;
    const item = data[index];

    // Ensure item exists before rendering
    if (!item) {
      return null; // Or render a placeholder if necessary
    }

    // Your JSX structure for the movie item
    return (
      <div style={style} key={item.id.toString() + index} title={item.title} className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
        <div className="w-full h-[289px] relative">
          <Image loading="eager" className="w-full h-full object-cover" src={`${IMAGE_URL}${item.poster_path}`} fill alt="movie title" />
        </div>
        <div className="p-4 bg-[#050E12] h-[calc(355px - 289px)] w-full flex flex-col">
          <p className="text-[#B6B6B6] text-lg font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">{item.title}</p>
          <p className="text-[#828282] text-sm">{getYear(item.release_date)}</p>
        </div>
      </div>
    );
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

  const getRowHeight = () => 355;
  useEffect(() => {
    if (!scrollContainerRef || !scrollContainerRef.current) return;
    const scrollContainer = scrollContainerRef.current;
    const { height, width } = scrollContainer.getBoundingClientRect();
    setDimension({ height, width });
  }, []);

  return (
    <div ref={scrollContainerRef} className="w-[100vw] h-full flex">
      <Grid
        className="border container bg-black fixedGrid"
        columnCount={columnCount}
        columnWidth={193} // Fixed column width
        height={dimension.height}
        rowCount={Math.ceil(data.length / columnCount)}
        rowHeight={355}
        width={dimension.width}
        itemData={data}
        ref={gridContainerRef}
      >
        {Cell}
      </Grid>
    </div>
  );
}
