import {
  Header,
  ColorScheme,
  useMantineTheme,
  ActionIcon,
} from '@mantine/core';

import { MdDarkMode } from 'react-icons/md';
import { BsSun } from 'react-icons/bs';

interface AdminHeaderProps {
  toggleColorScheme?: (value?: ColorScheme) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleColorScheme }) => {
  const theme = useMantineTheme();

  return (
    <Header height={70}>
      True Crime Podcast Database
      <ActionIcon
        variant='outline'
        color={theme.colorScheme === 'dark' ? 'yellow' : 'blue'}
        onClick={() => (toggleColorScheme ? toggleColorScheme() : {})}
        title='Toggle color scheme'>
        {theme.colorScheme === 'dark' ? (
          <BsSun style={{ width: 18, height: 18 }} />
        ) : (
          <MdDarkMode style={{ width: 18, height: 18 }} />
        )}
      </ActionIcon>
    </Header>
  );
};

export default AdminHeader;
