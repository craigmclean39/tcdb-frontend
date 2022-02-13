import { Anchor, Highlight, Group, createStyles, Badge } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Podcast, Episode } from '../types/podcast';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    resultsWrapper: {
      width: '50%',
    },
    result: {
      marginBottom: theme.spacing.xl,
    },
  };
});

interface SearchResultProps {
  id: string;
  type: string;
  query: string | string[];
}

const SearchResult: React.FC<SearchResultProps> = ({ id, type, query }) => {
  const [data, setData] = useState<Podcast | Episode | undefined>();
  const [content, setContent] = useState('');

  const { classes } = useStyles();

  useEffect(() => {
    async function getData() {
      switch (type) {
        case 'podcasts': {
          const data = await axios.get(
            `http://localhost:3001/api/podcast/${id}`
          );

          setData(data.data);
          setContent(data.data.description);
          break;
        }
        case 'episodes': {
          const data = await axios.get(
            `http://localhost:3001/api/episode/${id}`
          );

          setData(data.data);
          setContent(data.data.content);
          break;
        }
        default: {
          return;
        }
      }
    }

    getData();
  }, [id, type]);

  if (!data) {
    return <></>;
  }

  return (
    <li className={classes.result}>
      <Group className={classes.resultsWrapper} mb='xl' spacing='xs'>
        <Highlight
          href={`${data.url}`}
          highlight={query}
          component='a'
          color='blue'
          highlightStyles={(theme) => ({
            backgroundImage: theme.fn.linearGradient(
              45,
              theme.colors.cyan[5],
              theme.colors.indigo[5]
            ),
            fontWeight: 900,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}>
          {data.title}
        </Highlight>
        <Badge size='xs' color={type === 'podcasts' ? 'green' : 'red'}>
          {type === 'podcasts' ? 'Podcast' : 'Episode'}
        </Badge>
        <Highlight
          size='sm'
          className={classes.result}
          highlight={query}
          highlightStyles={(theme) => ({
            backgroundImage: theme.fn.linearGradient(
              45,
              theme.colors.cyan[5],
              theme.colors.indigo[5]
            ),
            fontWeight: 600,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}>
          {`${truncate(content, 50)} ...`}
        </Highlight>
      </Group>
    </li>
  );
};

function truncate(str: string, no_words: number) {
  return str.split(' ').splice(0, no_words).join(' ');
}

export default SearchResult;
