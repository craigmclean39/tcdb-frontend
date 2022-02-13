import { useEffect, useState } from 'react';
import { Episode } from '../types/podcast';
import { intervalToDuration, format } from 'date-fns';
import { Skeleton, Image, Text, Card, Group, Anchor } from '@mantine/core';

interface EpisodeLatestProps {
  episode: Episode;
}

const EpisodeLatest: React.FC<EpisodeLatestProps> = ({ episode }) => {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (episode.isoDate) {
      const duration = intervalToDuration({
        start: new Date(episode.isoDate),
        end: new Date(),
      });

      if (
        duration.years === 0 && duration.months === 0 && duration.days
          ? duration.days <= 10
          : false
      ) {
        setIsNew(true);
      }
    }
  }, [episode.isoDate]);

  return (
    <Card
      shadow='lg'
      component='article'
      padding='xs'
      sx={{ maxWidth: '300px', height: '425px' }}>
      <Anchor variant='text' href={episode.url}>
        <Group direction='column' spacing='xs' grow={false}>
          {episode.pubDate ? (
            <Text size='sm' color='dimmed'>
              {format(new Date(episode.pubDate), 'MMM do, yyyy')}
            </Text>
          ) : null}
          <Text variant='gradient' component='h3' my='0'>
            {episode.podcast?.title}
          </Text>

          {episode.podcast ? (
            episode.podcast.image ? (
              <Image
                src={episode.podcast?.image.url}
                alt=''
                sx={{ width: '100%' }}></Image>
            ) : (
              <Skeleton height={300} animate={false} />
            )
          ) : null}
          <Text size='xs'>Episode: {episode.title}</Text>
        </Group>
      </Anchor>
    </Card>
  );
};

export default EpisodeLatest;
