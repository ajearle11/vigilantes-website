import Link from "next/link";
import { posts } from "../lib/posts";

export default async function BlogPage() {
  return (
    <div>
      <div className="text-md text-center uppercase text-[#888] mb-4 font-mono">
        Blog Posts
      </div>
      <ul className="w-100 gap-3 list bg-base-100 rounded-box shadow-md">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.title}`}>
            <li className="list-row hover:bg-[#A28F00] hover:rounded rounded text-primary-content bg-primary font-mono uppercase">
              <div>
                <img
                  className="size-10 rounded-box"
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                />
              </div>
              <div>
                <div>{post.title}</div>
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
