import { NowRequest, NowResponse } from "@vercel/node";

import dbConnect from './db/databaseConnnect'

export default async (request: NowRequest, response: NowResponse) => {
  const { title, description, icon, image } = request.body;

  const db = await dbConnect(process.env.MONGODB_URI);

  const collection = db.collection("linksRepo");

  await collection.insertOne({
    title, 
    description, 
    icon, 
    image,
    createdAt: new Date(),
  });

  return response.status(201).json({ ok: "Link saved" });
};
