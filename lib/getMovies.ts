import { Movie } from './Models/movie';
import http from './utils/http';

export const fetchData = async (page: number): Promise<Movie[]> => {
  const response = await http.get(`movie/popular?language=en-US&page=${page}`);
  console.log({ response }, 'ssss');
  return response.data.results;
};
