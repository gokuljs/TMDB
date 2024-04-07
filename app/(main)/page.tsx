'use client';
import { Movie } from '@/lib/Models/movie';
import { useEffect, useRef, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { Cell } from './_components/GridCell';
import useColumnCount from '@/lib/hooks/useColumnCount';
import { fetchData } from '@/lib/getMovies';
import useInfiniteScroll from '@/lib/hooks/useInfiniteScroll';
import SkeletonLoader from './_components/Skeleton';

export default function Home(): JSX.Element {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const columnCount = useColumnCount();
  useInfiniteScroll(page, setPage, setData, loading);
  const [dimension, setDimension] = useState({
    height: 0,
    width: 0,
  });

  // fetching initial data
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
    // dimension of parent div after ui is mounted
    if (!scrollContainerRef || !scrollContainerRef.current) return;
    const scrollContainer = scrollContainerRef.current;
    const { height, width } = scrollContainer.getBoundingClientRect();
    setDimension({ height, width });
  }, []);

  return (
    <div ref={scrollContainerRef} className="w-[100vw] h-full flex">
      {loading ? (
        <div className="container">
          <SkeletonLoader />
        </div>
      ) : (
        <Grid
          className="container fixedGrid"
          columnCount={columnCount}
          columnWidth={193 + 30} // Fixed column width
          height={dimension.height}
          rowCount={Math.ceil(data.length / columnCount)}
          rowHeight={355 + 30}
          width={dimension.width}
          itemData={{ data, columnCount }}
        >
          {Cell}
        </Grid>
      )}
    </div>
  );
}
