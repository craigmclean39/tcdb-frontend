import type { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import {
  Container,
  Image,
  Loader,
  Skeleton,
  Title,
  Text,
  Spoiler,
  Card,
  Space,
  Anchor,
} from '@mantine/core';
import { createStyles } from '@mantine/core';
import { Podcast, Episode } from '../../../types/podcast';
import { format } from 'date-fns';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    wrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },

    detailLeft: {
      display: 'flex',
      flexDirection: 'column',
    },

    image: {
      width: 'clamp(100px, 150px, 150px)',
    },

    episodeWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const fetcher = async (apiAddress: any) => {
  /* const data = await axios.get(`http://localhost:3001${apiAddress}`);
  return data.data as Podcast; */

  const data = await axios.all([
    axios.get(`http://localhost:3001${apiAddress}`),
    axios.get(`http://localhost:3001${apiAddress}/episodes`),
  ]);

  console.log('1');
  console.log(data[0].data);
  console.log('2');
  console.log(data[1].data.episodes);
  return {
    podcast: data[0].data as Podcast,
    episodes: data[1].data.episodes as Episode[],
  };
};

const PodcastDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/podcast/${id}` : null, fetcher);

  const { classes } = useStyles();

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Container className={classes.wrapper}>
        <Loader></Loader>
      </Container>
    );

  console.log(data);
  return (
    <>
      <Card className={classes.wrapper} shadow='md' padding='md'>
        <Container className={classes.detailLeft}>
          <Title order={1}>
            <Text size='sm'>{data.podcast.title}</Text>
          </Title>
          {data.podcast.image ? (
            <Image
              className={classes.image}
              src={data.podcast.image.url}
              alt={data.podcast.image.title}></Image>
          ) : (
            <Skeleton animate={false} className={classes.image} />
          )}
        </Container>
        {data.podcast.description ? (
          <Spoiler maxHeight={120} showLabel='more...' hideLabel='hide'>
            <Text>{data.podcast.description}</Text>
          </Spoiler>
        ) : null}
      </Card>
      <Card shadow='md'>
        <Text>
          Link: <Anchor href={data.podcast.link}>{data.podcast.link}</Anchor>
        </Text>
        <Text>{data.podcast.copyright}</Text>
      </Card>
      <Space h='xl'></Space>
      <Card className={classes.episodeWrapper} shadow='md' padding='md'>
        <ul>
          {data.episodes.map((episode) => {
            return (
              <li key={episode.guid}>
                <Text>{episode.title}</Text>
                <Text>
                  {episode.pubDate
                    ? `Published: ${format(
                        new Date(episode.pubDate),
                        'MMM dd yyyy'
                      )}`
                    : ''}
                </Text>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
};

export default PodcastDetail;
