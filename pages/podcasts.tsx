import type { NextPage } from 'next';
import axios from 'axios';
import { Podcast } from '../types/podcast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '../components/layout';
import PodcastListElement from '../components/podcastListElement';
import { Text } from '@mantine/core';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await axios.get(`http://localhost:3001/api/podcasts`, {});

  return {
    props: {
      podcasts: data.data,
    },
  };
};

const Podcasts: NextPage = ({
  podcasts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  let elements = [];
  if (podcasts) {
    elements = podcasts.map((podcast: Podcast) => {
      return (
        <PodcastListElement
          key={podcast.title}
          title={podcast.title}
          url={podcast.url}
          image={podcast.image?.url}
        />
      );
    });
  }

  return (
    <Layout>
      <Text
        component='h2'
        variant='gradient'
        size='xl'
        weight='800'
        transform='uppercase'>
        Podcasts
      </Text>

      <ul style={{ listStyleType: 'none', padding: 0 }}>{elements}</ul>
    </Layout>
  );
};

export default Podcasts;
