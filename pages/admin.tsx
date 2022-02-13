import type { NextPage } from 'next';
import { useForm } from '@mantine/hooks';
import { Button, TextInput, Loader, Divider } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';
import Layout from '../components/layout';

const Admin: NextPage = ({ children }) => {
  const [populating, setPopulating] = useState(false);
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

  const handleClick = async () => {
    setPopulating(true);
    await axios.post('http://localhost:3001/api/populate');
    setPopulating(false);
  };

  return (
    <Layout>
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

        {!adding ? (
          <Button my='lg' type='submit'>
            Submit
          </Button>
        ) : (
          <Loader></Loader>
        )}
      </form>
      <Divider />
      <Button onClick={handleClick} my='lg' loading={populating}>
        Populate
      </Button>
    </Layout>
  );
};

export default Admin;
