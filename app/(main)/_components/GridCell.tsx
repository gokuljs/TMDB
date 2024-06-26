import { Movie } from '@/lib/Models/movie';
import getYear from '@/lib/getYear';
import Image from 'next/image';
import { useState } from 'react';

interface DataProps {
  data: Movie[];
  columnCount: number;
}

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: DataProps;
}
export const Cell: React.FC<CellProps> = ({ columnIndex, rowIndex, style, data }) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover state

  // Calculate the index of your item based on rowIndex and columnIndex
  const index = rowIndex * data.columnCount + columnIndex;
  const item = data.data[index];
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
  if (!item) {
    return null;
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex justify-center items-center fadeIn`}
      style={style}
      key={item.id.toString() + index}
    >
      <div title={item.title} className="bg-white  h-[360px] w-[193px] rounded-lg overflow-hidden shadow-lg flex flex-col">
        <div className="w-full h-[289px] relative">
          <Image
            loading="eager"
            className={`w-full h-full object-cover transform ${isHovered ? 'scale-105' : 'scale-100'} transition-transform duration-300 ease-in-out`}
            src={`${IMAGE_URL}${item.poster_path}`}
            fill
            alt="movie title"
          />
        </div>
        <div className="p-4 bg-[#050E12] h-[calc(355px - 289px)] w-full flex flex-col">
          <p className="text-[#B6B6B6] text-lg font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">{item.title}</p>
          <p className="text-[#828282] text-sm h-[20px]">{getYear(item.release_date)}</p>
        </div>
      </div>
    </div>
  );
};
