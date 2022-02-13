import type { NextPage } from 'next';
import { AppShell, createStyles } from '@mantine/core';
import Header from './header';
import HtmlHead from './htmlHead';

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    wrapper: {
      maxWidth: '100%',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
    },
    container: {
      width: 'clamp(100px, 100vw, 1024px)',
    },
  };
});

const Layout: NextPage = ({ children }) => {
  const { classes } = useStyles();

  return (
    <>
      <HtmlHead />
      <AppShell header={<Header />}>
        <div className={classes.wrapper}>
          <div className={classes.container}>{children}</div>
        </div>
      </AppShell>
    </>
  );
};

export default Layout;
