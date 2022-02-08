import { Group, Title, Text, Anchor } from '@mantine/core';
import { Episode } from '../types/podcast';

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
        {episodes.map((episode) => {
          return (
            <Anchor href={`/admin/${episode.url}`} key={episode.guid}>
              {episode.title}
            </Anchor>
          );
        })}
      </Group>
    </div>
  );
};

export default EpisodeList;
