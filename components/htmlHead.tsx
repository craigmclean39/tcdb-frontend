import Head from 'next/head';

interface HtmlHeadProps {
  title?: string;
  keywords?: string;
  description?: string;
}

const HtmlHead: React.FC<HtmlHeadProps> = ({
  title,
  keywords,
  description,
}) => {
  return (
    <Head>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <title>{title}</title>
    </Head>
  );
};

HtmlHead.defaultProps = {
  title: 'True Crime Podcast Database',
  keywords: 'True Crime',
  description: 'A true crime podcast database',
};

export default HtmlHead;
