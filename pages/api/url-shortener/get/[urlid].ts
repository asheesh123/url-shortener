import connectMongo from '../../../../utils/connectMongo';
import ShortUrl from '../../../../models/shortUrlModel';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTest(req: NextApiRequest, res: NextApiResponse) {
    console.log(req, res)
    const { urlid } = req.query
    console.log({ urlid })
    try {
        await connectMongo();
        const shortUrl = await ShortUrl.findOne({ short: urlid })
        if (shortUrl == null) return res.send(404)
        shortUrl.clicks++
        shortUrl.save()
        res.json({ shortUrl });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
