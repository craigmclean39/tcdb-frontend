import {
  Image,
  Title,
  Text,
  createStyles,
  Group,
  Button,
  Anchor,
} from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
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

  return (
    <header className={classes.grid}>
      <Image alt={imageAlt} src={image} my='xl' mx='xl'></Image>
      <Group
        direction='column'
        mx='xl'
        position='left'
        sx={{ height: '100%', justifyContent: 'space-between' }}>
        <Group direction='column' spacing='xs'>
          <Text weight={700} mt='xl'>
            {author}
          </Text>

          <Title order={1} style={{ fontSize: 60 }}>
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
