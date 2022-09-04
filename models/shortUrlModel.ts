import mongoose, { model, models } from 'mongoose';
import shortid from 'shortid';
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const ShortUrl = models.ShortUrl || model('ShortUrl', shortUrlSchema);

export default ShortUrl;