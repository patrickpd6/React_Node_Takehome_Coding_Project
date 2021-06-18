import { fetchMediasList } from '../../services/media';

export default async (req, res) => {
  // req.query.param is optional
  // If not sent from UI, it will fetch first page
  const pageNumber: Number = req.query.page || 1;
  try {
    const { media, pageInfo } = await fetchMediasList(pageNumber);
    res.status(200).json({
      data: media,
      meta: pageInfo,
    });
  } catch (e) {
    // Returning 500 for now as error message is unknown
    // In future: we can check for error code from graphQL endpoint and can use specific errorCodes
    res.status(500).json({
      reason: e.message,
    });
  }
};
