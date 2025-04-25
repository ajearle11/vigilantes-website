// import { getSession } from '@/lib/session'
import { posts } from "@/app/lib/posts";
import { notFound } from "next/navigation";

export default async function BlogPost({ params }) {


  let value = await params;
  console.log(value.id);
  const post = posts.find((p) => p.id === value.id);
  console.log(post);

  if (!post) notFound();

  //   const session = await getSession()
  //   const isAllowed = !post.private || session.user

  //   if (!isAllowed) {
  if (false) {
    return (
      <div>
        <h1>Restricted</h1>
        <p>You must be logged in to view this post.</p>
      </div>
    );
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
