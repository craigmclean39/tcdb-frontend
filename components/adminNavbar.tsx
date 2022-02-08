import { Anchor, Button, Navbar, NavbarProps, Loader } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import SearchBar from './searchBar';

function AdminNavbar(props: Omit<NavbarProps, 'children'>) {
  const handleClick = async () => {
    setLoading(true);
    await axios.post('http://localhost:3001/api/populate');
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  return (
    <Navbar {...props}>
      <Navbar.Section>
        <SearchBar />
      </Navbar.Section>
      <Navbar.Section>
        <Anchor href='/admin/podcast_create'>Add Podcast</Anchor>
      </Navbar.Section>
      <Navbar.Section>
        <Anchor href='/admin/podcasts'>Podcast List</Anchor>
      </Navbar.Section>
      <Navbar.Section>
        {loading ? (
          <Loader></Loader>
        ) : (
          <Button onClick={handleClick}>Populate</Button>
        )}
      </Navbar.Section>
    </Navbar>
  );
}

export default AdminNavbar;
