import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import Router from 'next/router';

const SearchBar = () => {
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  const handleSubmit = async (values: typeof form['values']) => {
    try {
      Router.push({ pathname: '/admin/search_results', query: values });
    } catch (err) {}
  };

  return (
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
  );
};

export default SearchBar;
