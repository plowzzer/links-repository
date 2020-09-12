import React, { useState } from "react";
import axios from "axios";

import Head from "next/head";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Home() {
  const [url, setUrl] = useState(
    "https://epicreact.dev/soul-crushing-components/"
  );

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");

  async function handleSearch() {
    setLoading(true);
    setShow(false);
    setTitle("");
    setDescription("");
    setIcon("");
    setImage("");
    try {
      const { status, data } = await axios.post("/api/getMetadata", { url });

      if (status !== 200) {
        return;
      }

      setLoading(false);
      data.title && setTitle(data.title);
      data.description && setDescription(data.description);
      data.icon && setIcon(data.icon);
      data.image && setImage(data.image);
      setShow(true);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  }

  return (
    <div className="flex">
      <div className="px-4 py-2 m-2">
        <Input
          name="link"
          className="mb-5"
          label="Url da página"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <Button name="Buscar Dados" onClick={handleSearch} />

        <Input
          name="title"
          className="mb-5"
          label="Título da página"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <Textarea
          name="description"
          className="mb-5"
          label="Descrição"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <Input
          name="icon"
          className="mb-5"
          label="Icone"
          value={icon}
          onChange={(e) => {
            setIcon(e.target.value);
          }}
        />

        <Input
          name="image"
          className="mb-5"
          label="Imagem"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </div>
      <div className="px-4 py-2 m-2">
        {show && (
          <Card
            title={title}
            description={description}
            icon={icon}
            image={image}
          />
        )}
      </div>
    </div>
  );
}
