import type { NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PodcastHeader from '../../components/podcastHeader';
import PodcastDetails from '../../components/podcastDetails';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import usePagination from '../../hooks/usePagination';
import useEffectAfterFirstUpdate from '../../hooks/useEffectAfterFirstUpdate';
import HtmlHead from '../../components/htmlHead';
import Layout from '../../components/layout';
import { config } from '../../config';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const data = await axios.get(
    `${config.NEXT_PUBLIC_SERVER_ADDRESS}/api/podcast/${id}`,
    {}
  );
  const episodeData = await axios.get(
    `${config.NEXT_PUBLIC_SERVER_ADDRESS}/api/podcast/${id}/episodes`,
    {
      params: { limit: 10, offset: 0 },
    }
  );

  return {
    props: {
      server: config.NEXT_PUBLIC_SERVER_ADDRESS,
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
  server,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { page, setPage, limit, setLimit } = usePagination(10);
  const [episodeData, setEpisodeData] = useState(episodes);

  const router = useRouter();
  const { id } = router.query;

  useEffectAfterFirstUpdate(() => {
    async function getEpisodes() {
      const episodeData = await axios.get(
        `${server}/api/podcast/${id}/episodes`,
        {
          params: { limit: limit, offset: (page - 1) * limit },
        }
      );

      setEpisodeData(episodeData.data);
    }

    getEpisodes();
  }, [page, id, limit]);

  return (
    <Layout>
      <HtmlHead title={podcast.title} description={podcast.description} />
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
    </Layout>
  );
};

export default PodcastDetail;
