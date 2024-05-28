"use client";

import Image from "next/image";
import styles from "./Blog.module.scss";
import Link from "next/link";
import { useBringOnePostMutation } from "app/redux/features/postApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "app/components/shared/Loader";

export default function PostPage({ id }: { id: string }) {

  const [bringPost2, { isLoading }] = useBringOnePostMutation();
  const [titulo, setTitulo] = useState<string>("");
  const [autor, setAutor] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [imagen, setImagen] = useState<string>("");
  const [contenido, setContenido] = useState<string>("");
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    bringPost2({id: id})
      .unwrap()
      .then((response) => {
        // console.log(response);
        setTitulo(response.Titulo);
        setAutor(response.Autor);
        setFecha(response.Fecha_publicacion);
        setImagen(response.Imagen);
        setContenido(response.Contenido);
        setPost(response);
      })
      .catch((e) => {
        toast.error("There was an error while fetching the post");
      });
  }, []);

  return (
    <>
      <div className={styles.navPost}>
        <Link href={"/blog"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </Link>
        
        <div></div>
      </div>
      {isLoading? <Loader color="orange"/>:
      <div className={styles.PostPage}>
        <h1>{titulo}</h1>
        <p className={styles.PostPage__autor}>
          <b>Autor: </b>{autor}
        </p>
        <p className={styles.PostPage__date}>
          <b>Release date: </b>{fecha.split('T')[0]}
        </p>
        <div style={{ height: 20}}></div>
        <Image
          src={imagen}
          alt="foto of post"
          width={100}
          height={100}
          className={styles.PostPage__foto}
        />
        <p className={styles.PostPage__contenido}>{contenido}</p>
      </div>}
    </>
  );
}
