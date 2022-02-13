import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import SearchResult from '../components/searchResult';
import Layout from '../components/layout';
import { Highlight } from '@mantine/core';
import { useEffect, useState } from 'react';

const fetcher = async (query: string) => {
  const data = await axios.post(`http://localhost:3001/api/search`, {
    search: query,
  });
  return data.data;
};

const SearchResults: NextPage = ({ children }) => {
  const [query, setQuery] = useState('');

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

  useEffect(() => {
    if (Array.isArray(router.query.search)) {
      setQuery(router.query.search[0]);
    } else {
      setQuery(router.query.search as string);
    }
  }, [router.query.search]);

  let searchResults = [];
  if (data) {
    if (data.hits.length > 0) {
      searchResults = data.hits.map((result: any) => {
        return (
          <SearchResult
            key={result.id}
            type={result.type}
            id={result.id}
            query={query ? query.split(' ') : ''}
          />
        );
      });
    }
  }

  return (
    <Layout>
      <h2>
        <Highlight
          highlight={router.query.search ? router.query.search : ''}
          highlightStyles={(theme) => ({
            backgroundImage: theme.fn.linearGradient(
              45,
              theme.colors.cyan[5],
              theme.colors.indigo[5]
            ),
            fontWeight: 700,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}>
          {`Showing search results for ${router.query.search}`}
        </Highlight>
      </h2>
      {data ? (
        data.hits.length === 0 ? (
          'No Results'
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>{searchResults}</ul>
        )
      ) : (
        ''
      )}
    </Layout>
  );
};

export default SearchResults;
