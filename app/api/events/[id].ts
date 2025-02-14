import { NextApiRequest, NextApiResponse } from 'next';
import Events from '../../../models/Events';
import connectDB from '../../../lib/mongo';

interface Event {
  title: string;
  author: string;
  body: string;
  briefSummary: string;
  location: string;
  imageUrls: string[];
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    console.log("Id received is : ", id);
    await connectDB();
    const _id = id;
    const event = await Events.findById(_id); 
    return res.json(event);
  } catch (error) {
    return res.json({ error });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    console.log("Id received is : ", id);
    await connectDB();
    const _id = id;
    const event = await Events.findByIdAndUpdate(_id, req.body, { new: true });
    return res.json(event);
  } catch (error) {
    return res.json({ error });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    console.log("Id received is : ", id);
    await connectDB();
    const _id = id;
    const event = await Events.findByIdAndDelete(_id);
    return res.json(event);
  } catch (error) {
    return res.json({ error });
  }
}