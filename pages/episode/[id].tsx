import type { NextPage } from 'next';
import axios from 'axios';
import { Container, Loader, Card, Breadcrumbs, Text } from '@mantine/core';
import { Episode, Podcast } from '../../types/podcast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '../../components/layout';
import { format } from 'date-fns';
import ReactAudioPlayer from 'react-audio-player';
import { config } from '../../config';

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
  if (!episode)
    return (
      <Container>
        <Loader></Loader>
      </Container>
    );

  return (
    <Layout>
      <Breadcrumbs mb='xl'>
        <Text variant='gradient' component='a' href={podcast.url}>
          {podcast.title}
        </Text>
        <Text my='0'>{episode.title}</Text>
      </Breadcrumbs>
      <Card>
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
        <p>{episode.content}</p>
        <ReactAudioPlayer src={episode.mediaUrl} controls />
      </Card>
    </Layout>
  );
};

export default EpisodeDetail;
