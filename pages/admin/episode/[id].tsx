import type { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Container, Loader, Card } from '@mantine/core';
import { Episode } from '../../../types/podcast';

const fetcher = async (apiAddress: any) => {
  const data = await axios.get(`http://localhost:3001${apiAddress}`);
  return data.data as Episode;
};

const EpisodeDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/episode/${id}` : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Container>
        <Loader></Loader>
      </Container>
    );

  return (
    <>
      <Card shadow='md'>{data.title}</Card>
    </>
  );
};

export default EpisodeDetail;
