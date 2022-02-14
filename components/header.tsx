import { Header } from '@mantine/core';
import { createStyles, TextInput, Button, Anchor, Title } from '@mantine/core';
import { useForm, useMediaQuery } from '@mantine/hooks';
import axios from 'axios';
import Router from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { CgMediaPodcast } from 'react-icons/cg';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    header: {
      display: 'flex',
      maxWidth: '100%',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerHeader: {
      display: 'flex',
      width: 'clamp(100px, 90vw, 1024px)',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    search: {
      display: 'flex',
      alignItems: 'flex-end',
    },

    button: {
      margin: theme.spacing.md,
    },
  };
});

const AdminHeader: React.FC = () => {
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  const handleSubmit = async (values: typeof form['values']) => {
    try {
      Router.push({ pathname: '/search', query: values });
    } catch (err) {}
  };

  const { classes } = useStyles();

  const matches = useMediaQuery('(min-width: 500px)');

  return (
    <Header height={70} className={classes.header}>
      <div className={classes.innerHeader}>
        <Anchor
          href='/'
          variant='text'
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <CgMediaPodcast style={{ width: '32px', height: '32px' }} />
          <Title order={1} mx='sm'>
            TCPD
          </Title>
        </Anchor>
        {matches ? (
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className={classes.search}>
            <TextInput
              className={classes.button}
              icon={<BsSearch />}
              size='xs'
              type='search'
              placeholder='Enter search'
              radius='sm'
              aria-label='Search'
              value={form.values.search}
              onChange={(event) =>
                form.setFieldValue('search', event.currentTarget.value)
              }></TextInput>
            <Button size='xs' type='submit' className={classes.button}>
              Search
            </Button>
          </form>
        ) : null}
        <Anchor href='/podcasts'>Podcasts</Anchor>
      </div>
    </Header>
  );
};

export default AdminHeader;
