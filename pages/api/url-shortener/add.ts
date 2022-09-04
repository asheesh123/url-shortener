import connectMongo from '../../../utils/connectMongo';
import ShortUrl from '../../../models/shortUrlModel';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTest(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();
    const shortUrl = await ShortUrl.create(req.body);
    res.json({ shortUrl });
  } catch (error) {
    res.json({ error });
  }
}
