"use client"

import BlogPost from "./BlogPost";
import styles from "./Blog.module.scss";
import { useBringPostsMutation } from "app/redux/features/postApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "app/components/shared/Loader";

interface PostProps {
  id: string;
  Titulo: string;
  Fecha_publicacion: string;
  Autor: string,
  Imagen: string,
  Contenido: string

}

export default function PostsMapping() {

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [bringPosts2, { isLoading: isLoading2 }] = useBringPostsMutation();

  useEffect(() => {
    fetchPosts();
  }, []);


  const fetchPosts = () => {
    bringPosts2(undefined)
      .unwrap()
      .then((response) => {
        // console.log(response);
        if (response != undefined) {
          setPosts(response);
        }
      })
      .catch((e) => {
        toast.error(
          "There was an error while loading the posts, please try again"
        );
      });
  };


    return (
      <div className={styles.posts}>
        {isLoading2? <Loader color="orange"></Loader>:posts.map((post) => (
          <BlogPost
            key={post.id}
            id={post.id}
            title={post.Titulo}
            autor={post.Autor}
            date={post.Fecha_publicacion}
            content={post.Contenido}
            image={post.Imagen}
          />
        ))}
      </div>
    );
  }