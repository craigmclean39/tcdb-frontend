import type { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Container, Loader, Card } from '@mantine/core';
import { Episode } from '../../../types/podcast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const data = await axios.get(`http://localhost:3001/api/episode/${id}`, {});

  return {
    props: {
      episode: data.data,
    },
  };
};

const EpisodeDetail: NextPage = ({
  episode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { id } = router.query;

  if (!episode)
    return (
      <Container>
        <Loader></Loader>
      </Container>
    );

  return (
    <>
      <Card shadow='md'>{episode.title}</Card>
    </>
  );
};

export default EpisodeDetail;
