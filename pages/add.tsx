import React, { useState } from "react";
import axios from "axios";

import Head from "next/head";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Card from "../components/Card";
import Loading from "../components/Loading";

export default function Add() {
  const [url, setUrl] = useState("");
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

  async function handleSave() {
    const params = {
      title,
      description,
      icon,
      image
    }

    try {
      const response = await axios.post('/api/saveLink', params)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-end mb-10">
        <Input
          name="link"
          label="Url da página"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          className="flex-1 mr-2"
        />
        <Button name="Visualizar" onClick={handleSearch} />
      </div>

      <div className="flex">
        <div className="flex-1 px-4 py-2 m-2">
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
        <div className="flex-1 px-4 py-2 m-2">
          {loading && <Loading />}
          {!loading && show && (
            <Card
              url={url}
              title={title}
              description={description}
              icon={icon}
              image={image}
            />
          )}
          {!loading && show && (
            <Button name="Salvar" onClick={handleSave} />
          )}
        </div>
      </div>
    </div>
  );
}
