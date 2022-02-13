import { Group, Title, Text, Divider, Pagination } from '@mantine/core';
import EpisodeCard from './episodeCard';
import { useScrollIntoView } from '@mantine/hooks';
import { Episode } from '../types/podcast';

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
  const { scrollIntoView, targetRef } = useScrollIntoView();

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
        <div ref={targetRef}></div>
        <Pagination page={page} onChange={setPage} total={pageTotal} />
        <Divider sx={{ width: '100%' }} mb='xl' />
        {episodes.map((episode) => {
          return <EpisodeCard episode={episode} key={episode.guid} />;
        })}
        <Divider sx={{ width: '100%' }} mt='xl' />
        <Pagination
          page={page}
          onChange={(value) => {
            scrollIntoView({ alignment: 'center' });
            setPage(value);
          }}
          total={pageTotal}
        />
      </Group>
    </div>
  );
};

export default EpisodeList;
