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
    const shortUrls = await ShortUrl.find();
    res.json({ shortUrls });
  } catch (error) {
    res.json({ error });
  }
}
