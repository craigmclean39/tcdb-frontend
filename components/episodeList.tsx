import { Group, Title, Text, Divider, Pagination } from '@mantine/core';
import { Episode } from '../types/podcast';
import EpisodeCard from './episodeCard';

interface EpisodeListProps {
  episodes: Episode[];
  episodeCount: number;
  page: number;
  setPage: any;
  pageTotal: number;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  episodeCount,
  page,
  setPage,
  pageTotal,
}) => {
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
        <Text color='dimmed' mt='xl'>{`${episodeCount} ${
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
        <Pagination page={page} onChange={setPage} total={pageTotal} />
        <Divider sx={{ width: '100%' }} mb='xl' />
        {episodes.map((episode) => {
          return <EpisodeCard episode={episode} key={episode.guid} />;
        })}
      </Group>
    </div>
  );
};

export default EpisodeList;
