import { useEffect, useState } from 'react';
import Head from 'next/head';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaList from './components/media-list';
import ErrorPage from './components/error-page';
import { getMediaList } from '../services/media';
import { useCallback } from 'react';

export async function getServerSideProps() {
  // Fetch data from API for server side rendering with pageNumber = 1
  const props = await getMediaList(1);
  return {
    props: {
      ...props,
      isClient: false
    }
  };
}

export default function App({ metaInfo, mediaInfo }) {
  // Used to differentiate between server side and client side
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [medias, setMedias] = useState(mediaInfo);
  const [pageInfo, setPageInfo] = useState(metaInfo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    } else {
      setIsLoading(true);
      getMediaList(currentPage)
        .then(({ mediaInfo, metaInfo }) => {
          setMedias(mediaInfo);
          setPageInfo(metaInfo);
        })
        .catch(() => {
          // Setting medias to null so error message can be displayed
          setMedias(null);
        }).finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentPage]);

  // Caching the changePage function for performance optimization
  const changePage = useCallback((_, newPage) => {
    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <div>
      <Head>
        <title>Media List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoading && <div className="app-loader"><CircularProgress /></div>}
        {medias ? <MediaList data={medias} /> : <ErrorPage />}
      </main>
      <footer>
        {pageInfo && <Pagination count={pageInfo.totalPages} page={pageInfo.currentPage} onChange={changePage} />}
      </footer>
    </div>
  );
}
