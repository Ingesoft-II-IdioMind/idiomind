import Image from "next/image";
import styles from "./Blog.module.scss";
import Link from "next/link";
import { Button } from "app/components/shared/Button";

export default function BlogPost({id,title, autor, date, content, image}:{id:string,title:string,autor:string, date:string, content:string, image:string}) {
  return (
    <Link className={styles.blogPost} href={`/blog/${id}`}>
        <Image src={image}
        alt="foto of post"
        width={100}
        height={100}
        className={styles.blogPost__foto}
        />
        <div className={styles.blogPost__content}>
            <div className={styles.blogPost__content__text}>
              <h5>{title}</h5>
              <p className={styles.blogPost__content__text__description}>{content}</p>
              <p className={styles.blogPost__content__text__date}><b>{autor}</b> / {date.split('T')[0]}</p>
            </div>
            <Button>Read more</Button>
        </div>
    </Link>
  );
}
