import type { NextPage } from 'next';
import axios from 'axios';
import { Card, Breadcrumbs, Text } from '@mantine/core';
import { Episode, Podcast } from '../../types/podcast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '../../components/layout';
import { format } from 'date-fns';
import ReactAudioPlayer from 'react-audio-player';
import { config } from '../../config';
import { useMediaQuery } from '@mantine/hooks';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const data = await axios.get(
    `${config.NEXT_PUBLIC_SERVER_ADDRESS}/api/episode/${id}`,
    {}
  );
  const podData = await axios.get(
    `${config.NEXT_PUBLIC_SERVER_ADDRESS}/api/podcast/${data.data.podcast}`,
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
  const matches = useMediaQuery('(max-width: 600px)');

  return (
    <Layout>
      <Breadcrumbs mb='xl' sx={{ maxWidth: '100%', overflow: 'hidden' }}>
        <Text variant='gradient' component='a' href={podcast.url}>
          {podcast.title}
        </Text>
        <Text my='0'>{episode.title}</Text>
      </Breadcrumbs>
      <Card sx={{ width: 'clamp(100px, 80vw, 1024px)' }}>
        <Text size='xl' weight={700} component='h2' my='xs'>
          {episode.title}
        </Text>
        {episode.pubDate ? (
          <Text color='dimmed' weight={800}>
            {`${format(new Date(episode.pubDate), 'MMM do, yyyy')} | ${
              episode.duration
            }`}
          </Text>
        ) : (
          <></>
        )}
        <Text component='p' size='lg'>
          {episode.content}
        </Text>
        <ReactAudioPlayer
          src={episode.mediaUrl}
          controls
          style={{ maxWidth: '90%' }}
        />
      </Card>
    </Layout>
  );
};

export default EpisodeDetail;
