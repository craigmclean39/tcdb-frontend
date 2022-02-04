import type { NextPage } from 'next';
import { useForm } from '@mantine/hooks';
import AdminPage from '../../components/adminPage';
import { Button, TextInput } from '@mantine/core';

const AddPodcast: NextPage = ({ children }) => {
  const form = useForm({
    initialValues: {
      rss: '',
    },
  });

  const handleSubmit = (values: typeof form['values']) => {
    console.log('AA');
  };

  return (
    <AdminPage>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label='RSS Feed'
          placeholder='http://...'
          value={form.values.rss}
          onChange={(event) =>
            form.setFieldValue('rss', event.currentTarget.value)
          }
        />

        <Button type='submit'>Submit</Button>
      </form>
    </AdminPage>
  );
};

export default AddPodcast;
