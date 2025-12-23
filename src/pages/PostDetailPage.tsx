import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "@heroui/react";
import { Bookmark, BookmarkCheck, Tag as TagIcon } from "lucide-react";

import { postService } from "@/services/post.service";
import { PostDetail } from "@/types";
import { RelatedPosts } from "@/components/detail/RelatedPosts";
import { CategoryNews } from "@/components/detail/CategoryNews";
import { CommentSection } from "@/components/detail/CommentSection";
import { ReadMoreNews } from "@/components/detail/ReadMoreNews";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/user.service";

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isLoggedIn } = useAuth();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setPost(null);

        // ✅ GỌI SERVICE ĐÚNG
        const response = await postService.getPostDetail(slug);

        // response là ApiResponse<PostDetail>
        const currentPost = response.data;
        setPost(currentPost);

        // ✅ KIỂM TRA LƯU BÀI
        if (isLoggedIn) {
          const saveRes = await userService.getSavedPosts();
          const alreadySaved = saveRes.data.some(
            (p) => p.id === currentPost.id
          );
          setIsSaved(alreadySaved);
        }
      } catch (error) {
        console.error("Lỗi tải bài viết:", error);
        setPost(null);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    fetchPostDetail();
  }, [slug, isLoggedIn]);

  const handleToggleSave = async () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để sử dụng chức năng này");
      return;
    }

    try {
      await userService.toggleSavePost(slug!);
      setIsSaved((prev) => !prev);
    } catch {
      alert("Có lỗi xảy ra khi lưu bài viết!");
    }
  };

  /* ================== RENDER ================== */

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Không tìm thấy bài viết!
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <span className="text-[#d80f1e] font-bold uppercase text-sm">
              {post.category?.name}
            </span>

            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                onClick={handleToggleSave}
              >
                {isSaved ? (
                  <BookmarkCheck className="text-blue-600 fill-blue-600" />
                ) : (
                  <Bookmark />
                )}
                <span className="text-sm">
                  {isSaved ? "Đã lưu" : "Lưu bài"}
                </span>
              </button>

              <span className="text-xs text-gray-500">
                {post.publishedAt &&
                  new Date(post.publishedAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="font-bold text-lg mb-6 text-gray-700">
            {post.summary}
          </p>

          <img
            src={post.thumbnail || "https://via.placeholder.com/800x400"}
            className="w-full rounded mb-6"
          />

          <div
            className="content-body text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          <div className="mt-8 font-bold text-right">
            Theo {post.author || "Người Lao Động"}
          </div>

          {/* TAGS */}
          {post.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t pt-6">
              <TagIcon size={18} />
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/tag/${tag.slug}`}
                  className="px-3 py-1 bg-gray-100 rounded text-sm"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8">
            <CommentSection postId={post.id} />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1">
          {post.relatedPosts?.length > 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold mb-4">TIN LIÊN QUAN</h3>
              <ul className="space-y-3">
                {post.relatedPosts.map((r) => (
                  <li key={r.id}>
                    <Link to={`/post/${r.slug}`} className="text-sm">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* BLOCK DƯỚI */}
      <div className="mt-12">
        <RelatedPosts
          categoryId={post.category}
          currentPostId={post.id}
        />
        <CategoryNews categoriesSlug={post.category?.slug} />
        <ReadMoreNews currentPostId={post.id} />
      </div>
    </section>
  );
}
