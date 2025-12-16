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
          pageNo: 0,
          pageSize: 20,
          categoriesSlug: [categorySlug],
        };

        const res = await postService.getPosts(filter);
        setPosts(res?.data?.items || []);
      } catch (err) {
        console.error("Fetch posts error:", err);
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

  const firstPost = posts.length > 0 ? posts[0] : null;

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl font-sans">
      {/* ===== HEADER CATEGORY (CHỈ TITLE) ===== */}
      <div className="border-b-2 border-gray-100 pb-4 mb-8">
        <h1 className="text-4xl font-bold text-[#333] font-serif">
          {category.name}
        </h1>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ===== LEFT COLUMN ===== */}
        <div className="lg:col-span-2">
          {posts.length > 0 ? (
            <div className="flex flex-col gap-8">
              {posts.map(post => (
                <article
                  key={post.id}
                  className="group flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0"
                >
                  <Link
                    className="sm:w-1/3 shrink-0 overflow-hidden rounded-lg aspect-video block"
                    to={`/post/${post.slug}`}
                  >
                    <img
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={post.thumbnail || PLACEHOLDER}
                    />
                  </Link>

                  <div className="flex flex-col justify-between">
                    <div>
                      <Link to={`/post/${post.slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#d80f1e] leading-snug transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded text-gray-500">
              Chưa có bài viết nào trong chuyên mục này.
            </div>
          )}
        </div>

        {/* ===== RIGHT SIDEBAR ===== */}
        <div className="lg:col-span-1">
          <div className="mb-8 sticky top-4">
            <div className="mb-8">
              <img
                alt="QC"
                className="w-full mx-auto rounded"
                src="https://adi.admicro.vn/adt/wd/2023/10/banner-300x600.jpg"
              />
            </div>

            {posts.length > 0 && (
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="text-lg font-bold text-[#d80f1e] mb-4 border-b border-gray-300 pb-2">
                  XEM NHIỀU NHẤT
                </h3>
                <ul className="space-y-4">
                  {posts.slice(0, 5).map(p => (
                    <li
                      key={p.id}
                      className="border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                    >
                      <Link
                        to={`/post/${p.slug}`}
                        className="text-sm font-semibold text-gray-800 hover:text-blue-600 leading-snug block"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== RELATED ===== */}
      {firstPost && (
        <div className="mt-12 pt-8">
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
