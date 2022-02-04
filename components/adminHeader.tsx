import { Header, HeaderProps } from '@mantine/core';

function AdminHeader(props: Omit<HeaderProps, 'children'>) {
  return <Header {...props}>Custom header</Header>;
}

export default AdminHeader;
