import type { NextPage } from 'next';
import AdminPage from '../../components/adminPage';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (apiAddress: any) => {
  const data = await axios.get(`http://localhost:3001${apiAddress}`);
  return data;
};

const PodcastList: NextPage = ({ children }) => {
  const { data, error } = useSWR('/api/podcasts', fetcher);

  let elements = [];
  if (data) {
    elements = data.data.map((podcast: any) => {
      return <div key={podcast.title}>{podcast.title}</div>;
    });
  }

  return (
    <AdminPage>
      <h1>Podcasts</h1>
      {elements}
    </AdminPage>
  );
};

export default PodcastList;
