import { createStyles, Spoiler, Text } from '@mantine/core';
import { Episode } from '../types/podcast';
import EpisodeList from './episodeList';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 5fr',
    },
  };
});

interface PodcastDetailsProps {
  description?: string;
  episodes?: Episode[];
  episodeCount?: number;
  page: number;
  setPage: any;
  pageTotal: number;
}

const PodcastDetails: React.FC<PodcastDetailsProps> = ({
  description,
  episodes,
  episodeCount,
  page,
  setPage,
  pageTotal,
}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.grid}>
      <Spoiler
        maxHeight={200}
        showLabel='more...'
        hideLabel='hide.'
        mx='xl'
        mt='xl'>
        <Text size='sm'>{description}</Text>
      </Spoiler>
      {episodes ? (
        <EpisodeList
          episodes={episodes}
          episodeCount={episodeCount ? episodeCount : 0}
          page={page}
          setPage={setPage}
          pageTotal={pageTotal}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PodcastDetails;
