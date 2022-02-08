import { createStyles, Spoiler, Text } from '@mantine/core';
import { Episode } from '../types/podcast';
import EpisodeList from './episodeList';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
    },
  };
});

interface PodcastDetailsProps {
  description?: string;
  episodes?: Episode[];
}

const PodcastDetails: React.FC<PodcastDetailsProps> = ({
  description,
  episodes,
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
      {episodes ? <EpisodeList episodes={episodes} /> : <></>}
    </div>
  );
};

export default PodcastDetails;
