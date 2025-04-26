import Link from "next/link";
import { posts } from "../lib/posts";

export default async function BlogPage() {
  return (
    <div className="my-10 mx-10">
      <div className="text-lg text-center uppercase text-[#888] mb-7 font-mono">
        Gig Blogs
      </div>
      <ul className="w-100 gap-5 bg-transparent list rounded-box shadow-md">
        {posts.map((post) => (
          <Link key={post.id} href={`/gigblogs/${post.id}`}>
            <li className="list-row hover:bg-[#A28F00] hover:rounded-xl rounded-xl text-primary-content bg-primary font-mono uppercase">
              <div className="flex items-center">
                <img
                  className="size-10 rounded-box"
                  src={post.image}
                />
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
