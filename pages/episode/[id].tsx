import type { NextPage } from 'next';
import axios from 'axios';
import { Container, Loader, Card, Anchor } from '@mantine/core';
import { Episode, Podcast } from '../../types/podcast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '../../components/layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const data = await axios.get(`http://localhost:3001/api/episode/${id}`, {});
  const podData = await axios.get(
    `http://localhost:3001/api/podcast/${data.data.podcast}`,
    {}
  );

  return {
    props: {
      episode: data.data as Episode,
      podcast: podData.data as Podcast,
    },
  };
};

const EpisodeDetail: NextPage = ({
  episode,
  podcast,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!episode)
    return (
      <Container>
        <Loader></Loader>
      </Container>
    );

  return (
    <Layout>
      <Card shadow='md'>
        <h1>{`${podcast.title}: ${episode.title}`}</h1>
        <p>{episode.content}</p>
        <Anchor href={episode.mediaUrl}>Media Link</Anchor>
      </Card>
    </Layout>
  );
};

export default EpisodeDetail;
