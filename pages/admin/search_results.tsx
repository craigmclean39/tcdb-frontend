import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import SearchResult from '../../components/searchResult';

const fetcher = async (query: string) => {
  const data = await axios.post(`http://localhost:3001/api/search`, {
    search: query,
  });
  return data.data;
};

const SearchResults: NextPage = ({ children }) => {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.search ? router.query.search : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  let searchResults = [];
  if (data) {
    if (data.hits.length > 0) {
      searchResults = data.hits.map((result: any) => {
        return (
          <SearchResult key={result.id} type={result.type} id={result.id} />
        );
      });
    }
  }

  return (
    <>
      <h1>Search Results</h1>
      <h2>{router.query.search}</h2>
      {data ? (data.hits.length === 0 ? 'No Results' : searchResults) : ''}
    </>
  );
};

export default SearchResults;
