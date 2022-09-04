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
        const url = await ShortUrl.findOneAndRemove({ short: urlid });
        if (!url) {
            res.status(404).send(`${urlid} was not found`);
        }
        res.status(200).send(`${urlid} was deleted.`);

    } catch (error) {
        res.json({ error });
    }
}
