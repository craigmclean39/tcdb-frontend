import { Header, HeaderProps } from '@mantine/core';

function AdminHeader(props: Omit<HeaderProps, 'children'>) {
  return <Header {...props}>True Crime Podcast Database</Header>;
}

export default AdminHeader;
