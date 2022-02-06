import type { NextPage } from 'next';
import { useForm } from '@mantine/hooks';
import { Button, TextInput, Loader } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

const PodcastCreate: NextPage = () => {
  const [serverError, setServerError] = useState<string>('');
  const [adding, setAdding] = useState(false);
  const form = useForm({
    initialValues: {
      rss: '',
    },
  });

  const handleSubmit = async (values: typeof form['values']) => {
    try {
      setAdding(true);
      await axios.post('http://localhost:3001/api/podcast/create', values);
      //SUCCESS
      Router.push('/admin/podcasts');
    } catch (err) {
      setAdding(false);
      setServerError('Error');
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

      {!adding ? <Button type='submit'>Submit</Button> : <Loader></Loader>}
    </form>
  );
};

export default PodcastCreate;
