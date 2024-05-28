import { PostPage } from "app/components/home/BlogPosts";


export default function BlogPost({ params }: { params: { id: string } }) {
    return (
      <PostPage id={params.id}/>
    );
  }