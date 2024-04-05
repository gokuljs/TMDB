import axios from 'axios';

type HeadersType = {
  'Content-Type': string;
  'X-Requested-With': string;
  [key: string]: string; // This allows additional string properties.
};

let defaultHeaders: HeadersType = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

if (process.env.TMDB_READ_ACCESS_TOKEN) {
  defaultHeaders = {
    ...defaultHeaders,
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
  };
}

// Setup base URL dynamically
const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/3' // Assuming you've setup a proxy to handle "/3" in development
    : process.env.REACT_APP_API_BASE_URL;

const Api = axios.create({
  baseURL, // Use the dynamically set base URL
  headers: defaultHeaders,
  responseType: 'json',
  withCredentials: true,
});

export default Api;
