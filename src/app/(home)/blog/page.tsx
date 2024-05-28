import { PostsMapping } from "app/components/home/BlogPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Blog page',
};

export default function Blog() {
    return (
      <>
        <h1>Idiomind's blog</h1>
        <p>Here you can find some of our latest news and articles, Learn tips to improve your lenguage learning path and how to take advantage of idiomind.</p>
        <section>
          <h2>Latest posts</h2>
          <PostsMapping />
          </section>
      </>
    );
  }
  