import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "@heroui/react";
import { Clock } from "lucide-react";

import { postService } from "@/services/post.service";
import { Post, PostFilter } from "@/types";
import { useCategories } from "@/contexts/CategoryContext";

import { RelatedPosts } from "@/components/detail/RelatedPosts";
import { CategoryNews } from "@/components/detail/CategoryNews";
import { ReadMoreNews } from "@/components/detail/ReadMoreNews";

const PLACEHOLDER = "https://via.placeholder.com/600x400?text=News";

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const categories = useCategories();
  const category = categories.find(c => c.slug === categorySlug);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);

        const filter: PostFilter = {
          pageNo: 1,
          pageSize: 20,
          categoriesSlug: [categorySlug],
        };

        const res = await postService.getPosts(filter);
        setPosts(res.data.items || []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    window.scrollTo(0, 0);
  }, [categorySlug]);

  if (!category || loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const firstPost = posts[0];

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="border-b pb-4 mb-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {posts.length > 0 ? (
            <div className="flex flex-col gap-8">
              {posts.map(post => (
                <article key={post.id} className="flex gap-6 border-b pb-8">
                  <Link
                    to={`/post/${post.slug}`}
                    className="w-1/3 overflow-hidden rounded-lg aspect-video"
                  >
                    <img
                      src={post.thumbnail || PLACEHOLDER}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-col justify-between">
                    <Link to={`/post/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {post.summary}
                    </p>
                    <span className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                      <Clock size={12} />
                      {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              Chưa có bài viết
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          {posts.length > 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold mb-4">XEM NHIỀU NHẤT</h3>
              <ul className="space-y-3">
                {posts.slice(0, 5).map(p => (
                  <li key={p.id}>
                    <Link to={`/post/${p.slug}`} className="text-sm">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {firstPost && (
        <div className="mt-12">
          <RelatedPosts
            categoryId={firstPost.category}
            currentPostId={firstPost.id}
          />
          <CategoryNews categoriesSlug={firstPost.category?.slug} />
          <ReadMoreNews currentPostId={firstPost.id} />
        </div>
      )}
    </section>
  );
}
