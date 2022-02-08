import type { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { createStyles } from '@mantine/core';
import { Podcast } from '../../../types/podcast';
import { useForm } from '@mantine/hooks';
import Router from 'next/router';
import { useState } from 'react';
import FullScreenLoader from '../../../components/FullscreenLoader';
import PodcastHeader from '../../../components/podcastHeader';
import PodcastDetails from '../../../components/podcastDetails';

const fetcher = async (apiAddress: any) => {
  const data = await axios.get(`http://localhost:3001${apiAddress}`);
  return data.data as Podcast;
};

const PodcastDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/podcast/${id}` : null, fetcher);
  const [deleting, setDeleting] = useState(false);

  const form = useForm({
    initialValues: {
      id: id,
    },
  });

  const handleSubmit = async (values: typeof form['values']) => {
    setDeleting(true);
    try {
      await axios.post(
        `http://localhost:3001/api/podcast/${id}/delete`,
        values
      );
      //SUCCESS
      Router.push('/admin/podcasts');
    } catch (err) {
      setDeleting(false);
    }
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <FullScreenLoader />;

  console.log(data);
  return (
    <>
      <PodcastHeader
        image={data.image?.url}
        imageAlt={data.image?.title}
        author={data.author}
        title={data.title}
        link={data.link}
      />
      <PodcastDetails description={data.description} episodes={data.episodes} />
    </>
  );
};

export default PodcastDetail;
