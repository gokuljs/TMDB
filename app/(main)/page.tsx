'use client';
import { Movie } from '@/lib/Models/movie';
import { useEffect, useRef, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { Cell } from './_components/GridCell';
import useColumnCount from '@/lib/hooks/useColumnCount';
import { fetchData } from '@/lib/getMovies';
import useInfiniteScroll from '@/lib/hooks/useInfinteScroll';

export default function Home(): JSX.Element {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<any>(null);
  const columnCount = useColumnCount();
  useInfiniteScroll(page, setPage, setData);
  const [dimension, setDimension] = useState({
    height: 0,
    width: 0,
  });
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
