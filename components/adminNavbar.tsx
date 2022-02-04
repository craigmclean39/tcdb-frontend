import { Anchor, Navbar, NavbarProps } from '@mantine/core';

function AdminNavbar(props: Omit<NavbarProps, 'children'>) {
  return (
    <Navbar {...props}>
      <Navbar.Section>
        <Anchor href='/admin/addpodcast'>Add Podcast</Anchor>
      </Navbar.Section>
      <Navbar.Section>
        <Anchor href='/admin/podcastlist'>View Podcasts</Anchor>
      </Navbar.Section>
    </Navbar>
  );
}

export default AdminNavbar;
