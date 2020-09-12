import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";
import jsdom from "jsdom";

export default async (request: NowRequest, response: NowResponse) => {
  const { url } = request.body;

  const method = url.split("//")[0];
  const domain = url
    .replace("https://", "")
    .replace("http://", "")
    .split("/")[0];

  const result = await axios.get(url, { responseType: "text" });
  const { document } = new jsdom.JSDOM(result.data).window;
  const metadata = {};

  const titleDOM = document.querySelectorAll('[property="og:title"]');
  const descriptionDOM = document.querySelectorAll('[name="description"]');
  const iconDOM = document.querySelectorAll("[rel=icon]");
  const imageDOM = document.querySelectorAll('[name="og:image"]');

  metadata["title"] = titleDOM.length > 0 ? titleDOM[0].content : null;

  metadata["description"] =
    descriptionDOM.length > 0 ? descriptionDOM[0].content : null;

  if (iconDOM.length > 0) {
    if (iconDOM[0].href.includes(domain)) {
      metadata["icon"] = iconDOM[0].href;
    } else {
      metadata["icon"] = `${method}//${domain}${iconDOM[0].href}`;
    }
  }

  metadata["image"] = imageDOM.length > 0 ? imageDOM[0].content : null;

  return response.status(200).json(metadata);
};
