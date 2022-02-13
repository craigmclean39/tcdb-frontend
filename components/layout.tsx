import type { NextPage } from 'next';
import { AppShell } from '@mantine/core';
import Header from './header';
import HtmlHead from './htmlHead';

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <HtmlHead />
      <AppShell header={<Header />}>{children}</AppShell>
    </>
  );
};

export default Layout;
