import { useEffect, useState } from 'react';
import { Episode } from '../types/podcast';
import { intervalToDuration, format } from 'date-fns';
import { Anchor, Badge, Spoiler, Title, Text, Card } from '@mantine/core';

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
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
    <Card sx={{ width: '100%' }} shadow='lg'>
      {isNew ? <Badge>New</Badge> : <></>}
      <Title order={3}>
        <Anchor
          href={`${episode.url}`}
          key={episode.guid}
          size='xl'
          variant='text'>
          {episode.title}
        </Anchor>
      </Title>
      <Spoiler maxHeight={80} hideLabel='hide.' showLabel='more...'>
        <Text weight={300} size='sm'>
          {episode.contentSnippet}
        </Text>
      </Spoiler>
      {episode.pubDate ? (
        <Text color='dimmed' weight={800}>
          {`${format(new Date(episode.pubDate), 'MMM do, yyyy')} | ${
            episode.duration
          }`}
        </Text>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default EpisodeCard;
