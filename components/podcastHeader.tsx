import {
  Image,
  Title,
  Text,
  createStyles,
  Group,
  Button,
  Anchor,
} from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 5fr',
    },
    small: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    smallImage: {
      width: 300,
      height: 300,
    },
  };
});

interface PodcastHeaderProps {
  image?: string;
  imageAlt?: string;
  author?: string;
  link?: string;
  title: string;
}

const PodcastHeader: React.FC<PodcastHeaderProps> = ({
  image,
  imageAlt,
  author,
  link,
  title,
}) => {
  const { classes } = useStyles();
  const matches = useMediaQuery('(min-width: 1100px)');
  const large = useMediaQuery('(min-width: 800px)');

  return (
    <header className={!large ? classes.small : classes.grid}>
      <Image
        alt={imageAlt}
        src={image}
        my='xl'
        mx='xl'
        className={!large ? classes.smallImage : ''}></Image>
      <Group
        direction='column'
        mx='xl'
        position='left'
        sx={{ height: '100%', justifyContent: 'space-between' }}>
        <Group direction='column'>
          <Text weight={700} mt='xl'>
            {author}
          </Text>

          <Title order={1} style={{ fontSize: matches ? 60 : 40 }}>
            {title}
          </Title>
        </Group>
        <Group>
          {link ? (
            <Anchor href={link} target='_blank'>
              <Button mb='xl'>Website</Button>
            </Anchor>
          ) : (
            <></>
          )}
        </Group>
      </Group>
    </header>
  );
};

export default PodcastHeader;
