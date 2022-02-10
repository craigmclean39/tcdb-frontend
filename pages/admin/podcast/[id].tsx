import type { NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PodcastHeader from '../../../components/podcastHeader';
import PodcastDetails from '../../../components/podcastDetails';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import usePagination from '../../../hooks/usePagination';
import useEffectAfterFirstUpdate from '../../../hooks/useEffectAfterFirstUpdate';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const data = await axios.get(`http://localhost:3001/api/podcast/${id}`, {});
  const episodeData = await axios.get(
    `http://localhost:3001/api/podcast/${id}/episodes`,
    {
      params: { limit: 20, offset: 0 },
    }
  );

  return {
    props: {
      podcast: data.data,
      episodes: episodeData.data,
      episodeCount: Number(episodeData.headers['x-total-count']),
    },
  };
  // ...
};

const PodcastDetail: NextPage = ({
  podcast,
  episodes,
  episodeCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { page, setPage, limit, setLimit } = usePagination();
  const [episodeData, setEpisodeData] = useState(episodes);

  const router = useRouter();
  const { id } = router.query;

  function fetchEpisodes() {
    async function getEpisodes() {
      const episodeData = await axios.get(
        `http://localhost:3001/api/podcast/${id}/episodes`,
        {
          params: { limit: 20, offset: (page - 1) * limit },
        }
      );

      setEpisodeData(episodeData.data);
    }

    getEpisodes();
  }

  useEffectAfterFirstUpdate(fetchEpisodes, [page, id, limit]);

  /* 
  const [deleting, setDeleting] = useState(false);
  const form = useForm({
    initialValues: {
      id: id,
    },
  });
  const handleSubmit = async (values: typeof form['values']) => {
    setDeleting(true);
    try {
      await axios.post(
        `http://localhost:3001/api/podcast/${id}/delete`,
        values
      );
      //SUCCESS
      Router.push('/admin/podcasts');
    } catch (err) {
      setDeleting(false);
    }
  }; */

  return (
    <>
      <PodcastHeader
        image={podcast.image?.url}
        imageAlt={podcast.image?.title}
        author={podcast.author}
        title={podcast.title}
        link={podcast.link}
      />
      <PodcastDetails
        description={podcast.description}
        episodes={episodeData}
        episodeCount={episodeCount}
        page={page}
        setPage={setPage}
        pageTotal={Math.ceil(episodeCount / limit)}
      />
    </>
  );
};

export default PodcastDetail;
