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
  Group,
  Anchor,
  Button,
} from '@mantine/core';
import { createStyles } from '@mantine/core';
import { Podcast, Episode } from '../../../types/podcast';
import { format } from 'date-fns';
import { useForm } from '@mantine/hooks';
import Router from 'next/router';

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
  };
});

const fetcher = async (apiAddress: any) => {
  /* const data = await axios.get(`http://localhost:3001${apiAddress}`);
  return data.data as Podcast; */

  const data = await axios.all([
    axios.get(`http://localhost:3001${apiAddress}`),
    axios.get(`http://localhost:3001${apiAddress}/episodes`),
  ]);

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

  const form = useForm({
    initialValues: {
      id: id,
    },
  });

  const handleSubmit = async (values: typeof form['values']) => {
    try {
      await axios.post(
        `http://localhost:3001/api/podcast/${id}/delete`,
        values
      );
      //SUCCESS
      Router.push('/admin/podcasts');
    } catch (err) {}
  };

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Container className={classes.wrapper}>
        <Loader></Loader>
      </Container>
    );

  return (
    <>
      <Card shadow='md'>
        <Container className={classes.wrapper}>
          <Group align='flex-start'>
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
          </Group>
          <Container mt='l'>
            {data.podcast.description ? (
              <Spoiler maxHeight={120} showLabel='more...' hideLabel='hide'>
                <Text>{data.podcast.description}</Text>
              </Spoiler>
            ) : null}
          </Container>
        </Container>
        <Container my='lg'>
          <Group direction='column' spacing='xs'>
            <Text>
              Link:{' '}
              <Anchor href={data.podcast.link}>{data.podcast.link}</Anchor>
            </Text>
            <Text>{data.podcast.copyright}</Text>
          </Group>
        </Container>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Button type='submit'>Delete</Button>
        </form>

        <Group align='flex-start'>
          <Text>Episodes:</Text>
          {/* <ul>
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
                </li> 'o;;;
              );
            })}
          </ul> */}
        </Group>
      </Card>
    </>
  );
};

export default PodcastDetail;
