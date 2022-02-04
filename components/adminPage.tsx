import type { NextPage } from 'next';
import { AppShell } from '@mantine/core';
import AdminHeader from '../components/adminHeader';
import AdminNavbar from '../components/adminNavbar';

const AdminPage: NextPage = ({ children }) => {
  return (
    <AppShell
      navbar={<AdminNavbar width={{ base: 300 }} height={500} padding='xs' />}
      header={<AdminHeader height={70} padding='xs' />}>
      {children}
    </AppShell>
  );
};

export default AdminPage;
