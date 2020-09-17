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

  const titleDOM = document.querySelectorAll<HTMLElement>("title");
  const titleOG = document.querySelectorAll<HTMLMetaElement>(
    '[property="og:title"]'
  );

  const descriptionDOM = document.querySelectorAll<HTMLMetaElement>(
    '[name="description"]'
  );
  const descriptionOG = document.querySelectorAll<HTMLMetaElement>(
    '[property="og:description"]'
  );

  const iconDOM = document.querySelectorAll<HTMLLinkElement>("[rel=icon]");
  const imageDOM = document.querySelectorAll<HTMLMetaElement>(
    '[name="og:image"]'
  );
  const imageOG = document.querySelectorAll<HTMLMetaElement>(
    '[property="og:image"]'
  );

  if (titleDOM.length > 0) {
    metadata["title"] = titleDOM[0].innerHTML;
  } else if (titleOG.length > 0) {
    metadata["title"] = titleOG[0].content;
  }

  if (descriptionDOM.length > 0) {
    metadata["description"] = descriptionDOM[0].content;
  } else if (descriptionOG.length > 0) {
    metadata["description"] = descriptionOG[0].content;
  }

  if (iconDOM.length > 0) {
    if (iconDOM[0].href.includes(domain)) {
      metadata["icon"] = iconDOM[0].href;
    } else {
      metadata["icon"] = `${method}//${domain}${iconDOM[0].href}`;
    }
  }

  if (imageDOM.length > 0) {
    metadata["image"] = imageDOM[0].content;
  } else if (imageOG.length > 0) {
    metadata["image"] = imageOG[0].content;
  }

  return response.status(200).json(metadata);
};
