import { Anchor, Navbar, NavbarProps } from '@mantine/core';

function AdminNavbar(props: Omit<NavbarProps, 'children'>) {
  return (
    <Navbar {...props}>
      <Navbar.Section>
        <Anchor href='/admin/podcast_create'>Add Podcast</Anchor>
      </Navbar.Section>
      <Navbar.Section>
        <Anchor href='/admin/podcasts'>Podcast List</Anchor>
      </Navbar.Section>
    </Navbar>
  );
}

export default AdminNavbar;
