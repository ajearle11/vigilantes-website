import Link from "next/link";
import { posts as gigPosts } from "../lib/posts";

export default async function BlogPage() {
  const posts = gigPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="my-10 mx-10 w-[90%] max-w-[550px]">
      <Link
        className="relative top-0 left-0 text-[#888] hover:text-white"
        href={`/`}
      >
        Back
      </Link>
      <div className="text-lg text-center uppercase text-[#888] mb-7 mt-10 font-mono">
        Gig Blogs
      </div>
      <ul className="w-full gap-5 bg-transparent list rounded-box shadow-md">
        {posts.map((post) => (
          <Link key={post.id} href={`/gigblogs/${post.id}`}>
            <li className="list-row hover:bg-[#A28F00] hover:rounded-xl rounded-xl text-primary-content bg-primary font-mono uppercase">
              <div className="flex items-center">
                <img className="size-10 rounded-box" src={post.image} />
              </div>
              <div>
                <div>{post.title}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {post.location}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {post.date.toLocaleDateString()}
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
