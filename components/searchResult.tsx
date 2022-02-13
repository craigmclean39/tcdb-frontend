import { Anchor } from '@mantine/core';
import axios from 'axios';
import useSWR from 'swr';
import { Podcast, Episode } from '../types/podcast';

const fetcher = async (props: SearchResultProps) => {
  switch (props.type) {
    case 'podcasts': {
      const data = await axios.get(
        `http://localhost:3001/api/podcast/${props.id}`
      );

      return data.data as Podcast;
    }
    case 'episodes': {
      const data = await axios.get(
        `http://localhost:3001/api/episode/${props.id}`
      );

      return data.data as Episode;
    }
    default: {
      return;
    }
  }
};

interface SearchResultProps {
  id: string;
  type: string;
}

const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { data, error } = useSWR(props, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  if (!data) {
    return <></>;
  }

  return (
    <li>
      <Anchor href={`${data.url}`}>{data.title}</Anchor>
    </li>
  );
};

export default SearchResult;
