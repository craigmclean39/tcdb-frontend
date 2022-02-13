import { createStyles, Image, Card, Anchor } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    card: {
      margin: theme.spacing.md,
      display: 'flex',
      alignItems: 'center',
    },
  };
});

interface PodcastListElementProps {
  title: string;
  url?: string;
  image?: string;
}

const PodcastListElement: React.FC<PodcastListElementProps> = ({
  title,
  url,
  image,
}) => {
  const { classes } = useStyles();

  return (
    <li className=''>
      <Card className={classes.card}>
        <Image src={image} alt='' width={64} />

        <Anchor variant='text' href={url} mx='lg'>
          {title}
        </Anchor>
      </Card>
    </li>
  );
};

export default PodcastListElement;
