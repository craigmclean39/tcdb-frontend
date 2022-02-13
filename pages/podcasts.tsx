import type { NextPage } from 'next';
import axios from 'axios';
import { Anchor } from '@mantine/core';
import { Podcast } from '../types/podcast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '../components/layout';

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
        <li key={podcast.title}>
          <Anchor href={`${podcast.url}`}>{podcast.title}</Anchor>
        </li>
      );
    });
  }

  if (!podcasts) {
    return <></>;
  }

  return (
    <Layout>
      <h1>Podcasts</h1>
      <ul>{elements}</ul>
    </Layout>
  );
};

export default Podcasts;
