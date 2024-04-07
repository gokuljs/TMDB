import { Movie } from '@/lib/Models/movie';
import { fetchData } from '@/lib/getMovies';
import http from '@/lib/utils/http';

jest.mock('../lib/utils/http.ts'); // Mock your http utility

const dummyMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: '/pathToBackdrop1.jpg',
    genre_ids: [1, 2, 3],
    id: 1,
    original_language: 'en',
    original_title: 'Original Movie Title 1',
    overview: 'Description of the first movie.',
    popularity: 8.5,
    poster_path: '/pathToPoster1.jpg',
    release_date: '2023-01-01',
    title: 'Movie 1',
    video: false,
    vote_average: 7.5,
    vote_count: 200,
  },
  {
    adult: false,
    backdrop_path: '/pathToBackdrop2.jpg',
    genre_ids: [4, 5, 6],
    id: 2,
    original_language: 'en',
    original_title: 'Original Movie Title 2',
    overview: 'Description of the second movie.',
    popularity: 9.0,
    poster_path: '/pathToPoster2.jpg',
    release_date: '2023-02-02',
    title: 'Movie 2',
    video: false,
    vote_average: 8.0,
    vote_count: 300,
  },
];

describe('fetchData', () => {
  it('fetches popular movies and returns data', async () => {
    // Mock the HTTP get method
    (http.get as jest.Mock).mockResolvedValue({
      data: {
        results: dummyMovies,
      },
    });

    const page = 1;
    const movies = await fetchData(page);
    expect(movies).toEqual(dummyMovies);
    expect(http.get).toHaveBeenCalledWith(`movie/popular?language=en-US&page=${page}`);
  });
  it('handles errors when fetching movies fails', async () => {
    // Mock the HTTP get method to reject
    (http.get as jest.Mock).mockRejectedValue(new Error('API error'));

    const page = 99999999192232323;
    await expect(fetchData(page)).rejects.toThrow('API error');

    // Optionally, you can also check that http.get was called with the expected URL
    expect(http.get).toHaveBeenCalledWith(`movie/popular?language=en-US&page=${page}`);
  });
});
