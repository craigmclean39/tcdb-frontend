import type { NextPage } from 'next';
import { useForm } from '@mantine/hooks';
import { Button, TextInput } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';
import Layout from '../components/layout';

const Login: NextPage = () => {
  const [serverError, setServerError] = useState<string>('');
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form['values']) => {
    try {
      await axios.post('http://localhost:3001/login', values);
      //SUCCESS
      Router.push('/admin/podcasts');
    } catch (err) {
      console.log('Failure');
      console.dir(err);
      /*       setServerError('Error');
      form.setFieldError('rss', true); */
    }
  };

  return (
    <Layout>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label='Username'
          placeholder='...'
          value={form.values.username}
          error={form.errors.username && serverError}
          onFocus={() => {
            setServerError('');
            form.setFieldError('username', false);
          }}
          onChange={(event) =>
            form.setFieldValue('username', event.currentTarget.value)
          }
        />

        <TextInput
          required
          label='Password'
          type='password'
          placeholder='...'
          value={form.values.password}
          error={form.errors.password && serverError}
          onFocus={() => {
            setServerError('');
            form.setFieldError('password', false);
          }}
          onChange={(event) =>
            form.setFieldValue('password', event.currentTarget.value)
          }
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Layout>
  );
};

export default Login;
