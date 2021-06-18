import urls from '../constants/urls';

// GraphQL Query to fetch the first 10 media types
// Note: For fetching title, we have to use title.english
const query = `
  query($pageNumber: Int) {
    Page(page: $pageNumber, perPage: 10) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
      }
      media {
        id
        title {
          english
        }
        description
        bannerImage
      }
    }
  }
`;

// For all data fetching, we are using services instead of doing it directly in pages/api directory
export const fetchMediasList = async (pageNumber: Number) => {
  const request = await fetch(urls.ANILIST_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { pageNumber },
    }),
  });
  const response = await request.json();
  return response?.data?.Page;
};

export const getMediaList = async (currentPage: Number) => {
  const response = await fetch(`${urls.GET_MEDIA_LIST}?page=${currentPage}`);
  const { meta, data } = await response.json();
  const { total, perPage, ...rest } = meta;
  return {
    mediaInfo: data,
    metaInfo: {
      ...rest,
      // Calculating the total number of pages by ceiling the result of total/perPage
      // total and perPage are being powered by graphQL server
      totalPages: Math.ceil(total / perPage),
    }
  };
};
