import { Header } from '@mantine/core';
import { createStyles, TextInput, Button, Anchor } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import Router from 'next/router';
import { BsSearch } from 'react-icons/bs';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    header: {
      display: 'flex',
      maxWidth: '100%',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Open Sans',
    },
    innerHeader: {
      display: 'flex',
      width: 'clamp(100px, 100vw, 1024px)',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    search: {
      display: 'flex',
      alignItems: 'flex-end',
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
  return (
    <Header height={70} className={classes.header}>
      <div className={classes.innerHeader}>
        <Anchor href='/' variant='text'>
          True Crime Podcast Database
        </Anchor>
        <form onSubmit={form.onSubmit(handleSubmit)} className={classes.search}>
          <TextInput
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
          <Button size='xs' type='submit'>
            Search
          </Button>
        </form>
        <Anchor href='/podcasts'>Podcasts</Anchor>
      </div>
    </Header>
  );
};

export default AdminHeader;
