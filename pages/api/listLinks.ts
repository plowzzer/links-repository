import { NowRequest, NowResponse } from "@vercel/node";

import dbConnect from './db/databaseConnnect'

export default async (request: NowRequest, response: NowResponse) => {
  const { email } = request.body;

  const db = await dbConnect(process.env.MONGODB_URI);

  const collection = db.collection("linksRepo");

  collection.find({}).toArray( (err, res) => {
    if(err) throw err;
    return response.status(200).json(res);
  })


  // return response.status(200).json(res);
};

// dbo.collection("customers").find({}).toArray(function(err, result) {
//   if (err) throw err;
//   console.log(result);
//   db.close();
// });