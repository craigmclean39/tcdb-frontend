import type { NextPage } from 'next';
import Layout from '../components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import { Text, Group } from '@mantine/core';
import { Episode } from '../types/podcast';
import EpisodeLatest from '../components/episodeLatest';
import { config } from '../config';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const episodeData = await axios.get(
    `${config.NEXT_PUBLIC_SERVER_ADDRESS}/api/episodes`,
    {
      params: { limit: 5, offset: 0 },
    }
  );

  return {
    props: {
      episodes: episodeData.data as Episode[],
    },
  };
  // ...
};

const Home: NextPage = ({
  episodes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Text
        component='h2'
        variant='gradient'
        size='xl'
        weight='800'
        transform='uppercase'>
        Latest
      </Text>

      <Group>
        {episodes.map((episode: Episode) => {
          return <EpisodeLatest key={episode.guid} episode={episode} />;
        })}
      </Group>
    </Layout>
  );
};

export default Home;
