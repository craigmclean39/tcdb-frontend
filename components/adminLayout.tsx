import type { NextPage } from 'next';
import { AppShell, ColorScheme } from '@mantine/core';
import AdminHeader from './adminHeader';
import AdminNavbar from './adminNavbar';
import HtmlHead from './htmlHead';

interface AdminLayoutProps {
  toggleColorScheme?: (value?: ColorScheme) => void;
}

const AdminLayout: NextPage<AdminLayoutProps> = ({
  children,
  toggleColorScheme,
}) => {
  return (
    <>
      <HtmlHead />
      <AppShell
        navbar={
          <AdminNavbar
            width={{ base: 300 }}
            sx={{ minWidth: 300 }}
            height={500}
            padding='xs'
          />
        }
        header={<AdminHeader toggleColorScheme={toggleColorScheme} />}>
        {children}
      </AppShell>
    </>
  );
};

export default AdminLayout;
