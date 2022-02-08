import { Group, Title, Text, Divider } from '@mantine/core';
import { Episode } from '../types/podcast';
import EpisodeCard from './episodeCard';

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  return (
    <div>
      <Group
        sx={{
          alignItems: 'center',
          height: 'max-content',
        }}>
        <Title order={2} mt='xl'>
          Episodes
        </Title>
        <Text color='dimmed' mt='xl'>{`${episodes.length} ${
          episodes.length > 1 ? 'episodes' : 'episode'
        }`}</Text>
      </Group>
      <Group
        my='xl'
        spacing='xs'
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <Divider sx={{ width: '100%' }} mb='xl' />
        {episodes.map((episode) => {
          return <EpisodeCard episode={episode} key={episode.guid} />;
        })}
      </Group>
    </div>
  );
};

export default EpisodeList;
