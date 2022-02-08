import { Loader, Container } from '@mantine/core';
const FullScreenLoader = () => {
  return (
    <Container
      padding='xl'
      fluid
      style={{ display: 'flex', justifyContent: 'center' }}>
      <Loader></Loader>
    </Container>
  );
};

export default FullScreenLoader;
