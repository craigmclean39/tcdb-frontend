import type { NextPage } from 'next';
import { useForm } from '@mantine/hooks';
import { Button, TextInput } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

const PodcastCreate: NextPage = () => {
  const [serverError, setServerError] = useState<string>('');
  const form = useForm({
    initialValues: {
      rss: '',
    },
  });

  const handleSubmit = async (values: typeof form['values']) => {
    try {
      await axios.post('http://localhost:3001/api/podcast/create', values);
      //SUCCESS
      Router.push('/admin/podcastlist');
    } catch (err) {
      console.log('CATCH');
      console.dir(err);
      setServerError(err.response.data.message);
      form.setFieldError('rss', true);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label='RSS Feed'
        placeholder='http://...'
        value={form.values.rss}
        error={form.errors.rss && serverError}
        onFocus={() => {
          setServerError('');
          form.setFieldError('rss', false);
        }}
        onChange={(event) =>
          form.setFieldValue('rss', event.currentTarget.value)
        }
      />

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default PodcastCreate;
