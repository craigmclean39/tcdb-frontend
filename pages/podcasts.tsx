import type { NextPage } from 'next';
import axios from 'axios';
import { Podcast } from '../types/podcast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '../components/layout';
import PodcastListElement from '../components/podcastListElement';
import { Text, Pagination } from '@mantine/core';
import usePagination from '../hooks/usePagination';
import useEffectAfterFirstUpdate from '../hooks/useEffectAfterFirstUpdate';
import { useState } from 'react';
import { useScrollIntoView } from '@mantine/hooks';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await axios.get(`http://localhost:3001/api/podcasts`, {
    params: { limit: 10, offset: 0 },
  });

  console.log(Number(data.headers['x-total-count']));
  return {
    props: {
      podcasts: data.data,
      podcastCount: Number(data.headers['x-total-count']),
    },
  };
};

const Podcasts: NextPage = ({
  podcasts,
  podcastCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [podcastsData, setPodcastsData] = useState(podcasts);
  const { page, setPage, limit, setLimit } = usePagination(10);
  const { scrollIntoView, targetRef } = useScrollIntoView();

  useEffectAfterFirstUpdate(() => {
    async function getPodcasts() {
      const episodeData = await axios.get(
        `http://localhost:3001/api/podcasts`,
        {
          params: { limit: limit, offset: (page - 1) * limit },
        }
      );

      setPodcastsData(episodeData.data);
    }

    getPodcasts();
  }, [page, limit]);

  let elements = [];
  if (podcastsData) {
    elements = podcastsData.map((podcast: Podcast) => {
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
        ref={targetRef}
        component='h2'
        variant='gradient'
        size='xl'
        weight='800'
        transform='uppercase'>
        Podcasts
      </Text>

      <Pagination
        page={page}
        onChange={setPage}
        total={Math.ceil(podcastCount / limit)}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>{elements}</ul>
      <Pagination
        page={page}
        onChange={(value) => {
          scrollIntoView({ alignment: 'center' });
          setPage(value);
        }}
        total={Math.ceil(podcastCount / limit)}
      />
    </Layout>
  );
};

export default Podcasts;
