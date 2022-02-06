import type { NextPage } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { Anchor, TextInput, Button } from '@mantine/core';
import { Podcast } from '../../types/podcast';
import { useForm } from '@mantine/hooks';
import { useState } from 'react';

const fetcher = async (apiAddress: any) => {
  const data = await axios.get(`http://localhost:3001${apiAddress}`);
  return data;
};

const Podcasts: NextPage = ({ children }) => {
  const { data, error } = useSWR('/api/podcasts', fetcher);
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  const handleSubmit = async (values: typeof form['values']) => {
    try {
      // console.log('Attempting to search with:');
      // console.log(values);
      await axios.post(`http://localhost:3001/api/search`, values);
    } catch (err) {}
  };

  let elements = [];
  if (data) {
    elements = data.data.map((podcast: Podcast) => {
      return (
        <li key={podcast.title}>
          <Anchor href={`/admin/podcast/${podcast._id}`}>
            {podcast.title}
          </Anchor>
        </li>
      );
    });
  }

  if (error) {
    return <div> Error</div>;
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <h1>Podcasts</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder='Search...'
          label='Search'
          value={form.values.search}
          onChange={(event) =>
            form.setFieldValue('search', event.currentTarget.value)
          }></TextInput>
        <Button type='submit'>Search</Button>
      </form>
      <ul>{elements}</ul>
    </>
  );
};

export default Podcasts;
/* value={form.values.rss}
        error={form.errors.rss && serverError}
        onFocus={() => {
          setServerError('');
          form.setFieldError('rss', false);
        }}
        onChange={(event) =>
          form.setFieldValue('rss', event.currentTarget.value)
        } */
