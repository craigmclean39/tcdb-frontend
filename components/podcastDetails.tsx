import { createStyles, Spoiler, Text } from '@mantine/core';
import { Episode } from '../types/podcast';
import EpisodeList from './episodeList';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 5fr',
      maxWidth: '100%',
    },
    left: {
      minWidth: '100%',
      maxWidth: '100%',
      gridColumnStart: 1,
    },
    right: {
      minWidth: '100%',
      maxWidth: '100%',
      gridColumnStart: 2,
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
      <div className={classes.left}>
        <Spoiler
          maxHeight={200}
          showLabel='more...'
          hideLabel='hide.'
          mx='xl'
          mt='xl'>
          <Text size='sm'>{description}</Text>
        </Spoiler>
      </div>
      {episodes ? (
        <div className={classes.right}>
          <EpisodeList
            episodes={episodes}
            episodeCount={episodeCount ? episodeCount : 0}
            page={page}
            setPage={setPage}
            pageTotal={pageTotal}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PodcastDetails;
