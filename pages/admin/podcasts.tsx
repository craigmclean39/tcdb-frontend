import type { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { Anchor } from '@mantine/core';
import { Podcast } from '../../types/podcast';

const fetcher = async (apiAddress: any) => {
  const data = await axios.get(`http://localhost:3001${apiAddress}`);
  return data;
};

const Podcasts: NextPage = ({ children }) => {
  const { data, error } = useSWR('/api/podcasts', fetcher);

  let elements = [];
  if (data) {
    elements = data.data.map((podcast: Podcast) => {
      return (
        <li key={podcast.title}>
          <Anchor href={`/admin${podcast.url}`}>{podcast.title}</Anchor>
        </li>
      );
    });
  }

  if (error) {
    return <div> Error</div>;
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <h1>Podcasts</h1>

      <ul>{elements}</ul>
    </>
  );
};

export default Podcasts;
