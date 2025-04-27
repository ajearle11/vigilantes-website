// import { getSession } from '@/lib/session'
import { posts } from "@/app/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPost({ params }: { params: { id: string } }) {
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
    <div className="my-10 w-full max-w-200">
      <Link className="relative top-0 left-10 text-[#888] hover:text-white" key={post.id} href={`/gigblogs`}>
        Back
      </Link>
      <div className="text-xl text-center uppercase text-[#888] mb-1 mt-10 font-mono">
        {post.title} - {post.location}
      </div>
      <div className="text-lg text-center uppercase text-[#888] mb-7 font-mono">
        {post.date.toLocaleDateString()}
      </div>
      <div className="bg-primary p-5 mb-10 mx-10 rounded-xl text-primary-content">
        <div className="text-xl italic text-center uppercase mb-1 font-mono">
          "{post.quote}"
        </div>
        <div className="text-md italic text-center font-mono">
          - Sound Guy
        </div>
      </div>
      <div className="text-lg text-center text-[#888] mb-7 mx-10 font-mono">
        {post.content}
      </div>
    </div>
  );
}
