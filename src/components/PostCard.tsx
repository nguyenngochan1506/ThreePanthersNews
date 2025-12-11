import React from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Post } from "@/types";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
    post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const navigate = useNavigate();

    // Hàm format ngày tháng cho đẹp (VD: 11/12/2025)
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    return (
        <Card
            className="py-4 cursor-pointer hover:scale-[1.02] transition-transform"
            isPressable
            onPress={() => navigate(`/post/${post.slug}`)} // Dùng slug để chuyển trang chuẩn SEO
        >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                {/* 1. SỬA: Lấy tên danh mục (thêm dấu ? đề phòng null) */}
                <p className="text-tiny uppercase font-bold text-primary">
                    {post.category?.name || "Tin tức"}
                </p>

                {/* 2. SỬA: Format ngày tháng */}
                <small className="text-default-500">
                    {formatDate(post.publishedAt)}
                </small>

                <h4 className="font-bold text-large mt-1 line-clamp-2 text-left">
                    {post.title}
                </h4>
            </CardHeader>

            <CardBody className="overflow-visible py-2">
                <Image
                    alt={post.title}
                    className="object-cover rounded-xl w-full h-[200px]"
                    // Thêm ảnh mặc định nếu post không có thumbnail
                    src={post.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                    width={300} // HeroUI khuyên dùng số cụ thể cho width để optimize
                />
                <p className="mt-2 text-sm text-gray-500 line-clamp-3 text-left">
                    {post.summary}
                </p>
            </CardBody>
        </Card>
    );
};

// import { useEffect, useState } from "react";
// import DefaultLayout from "@/layouts/default";
// import { PostCard } from "@/components/PostCard";
// import { TopStoryCard } from "@/components/TopStoryCard"; // Component mới
// import { SidebarNewsList } from "@/components/SidebarNewsList"; // Component mới
// import { postService } from "@/services/post.service";
// import { Post, PostFilter } from "@/types";
// import { Spinner } from "@heroui/react";

// export default function IndexPage() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         // Lấy nhiều bài hơn để đủ chia cho các khu vực (20 bài)
//         const filter: PostFilter = {
//           pageNo: 0,
//           pageSize: 20,
//         };

//         const response = await postService.getPosts(filter);
//         if (response && response.data && response.data.items) {
//           setPosts(response.data.items);
//         } else {
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error("Lỗi tải bài viết:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) return <div className="flex justify-center mt-20"><Spinner size="lg" /></div>;
  
//   // --- PHÂN CHIA DỮ LIỆU ---
//   // Bài đầu tiên làm Top Story
//   const topStory = posts.length > 0 ? posts[0] : null;
  
//   // 6 bài tiếp theo cho phần tin chính bên dưới (bỏ qua bài đầu tiên)
//   const mainPosts = posts.slice(1, 7);
  
//   // Các bài còn lại cho sidebar "TIN NÓNG" (bỏ qua 7 bài đầu)
//   const sidebarPosts = posts.slice(7, 15);

//   return (
//     <DefaultLayout>
//       {/* Container chính với padding */}
//       <section className="container mx-auto px-4 py-8 max-w-7xl">
        
//         {posts.length > 0 ? (
//           /* LAYOUT GRID 2 CỘT: Cột trái to gấp đôi cột phải trên màn hình lớn (lg) */
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
//             {/* === CỘT CHÍNH (BÊN TRÁI) - Chiếm 2 phần === */}
//             <div className="lg:col-span-2">
//               {/* 1. Bài viết nổi bật nhất (Top Story) */}
//               {topStory && <TopStoryCard post={topStory} />}

//               <div className="border-t border-gray-200 my-6"></div>

//               {/* 2. Các bài viết khác bên dưới - Grid 2 cột nhỏ */}
//               <h3 className="text-xl font-bold mb-4 text-left border-l-4 border-blue-600 pl-3">TIN MỚI CẬP NHẬT</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
//                 {mainPosts.map((post) => (
//                   // Tái sử dụng PostCard cũ cho phần này là hợp lý
//                   <PostCard key={post.id} post={post} />
//                 ))}
//               </div>
//             </div>

//             {/* === SIDEBAR (BÊN PHẢI) - Chiếm 1 phần === */}
//             <div className="lg:col-span-1 pl-0 lg:pl-4 border-l-0 lg:border-l border-gray-100">
//                {/* Widget Sự Kiện (Ảnh tĩnh giả lập banner quảng cáo/sự kiện) */}
//               <div className="mb-8 rounded-lg overflow-hidden shadow-sm">
//                    <img 
//                     src="https://nld.mediacdn.vn/thumb_w/300/2023/5/12/sea-games-32-16838609866721552887330.jpg" 
//                     alt="Sự kiện hot" 
//                     className="w-full h-auto hover:scale-105 transition-transform duration-500" 
//                    />
//               </div>

//               {/* Danh sách TIN NÓNG */}
//               {sidebarPosts.length > 0 && (
//                   <SidebarNewsList title="TIN NÓNG" posts={sidebarPosts} />
//               )}

//               {/* Khối Quảng cáo / Xem nhiều */}
//               <div className="bg-gray-50 p-6 text-center text-gray-400 border border-dashed border-gray-300 rounded-lg min-h-[200px] flex flex-col items-center justify-center">
//                   <span className="text-sm font-semibold">KHU VỰC QUẢNG CÁO</span>
//                   <span className="text-xs mt-2">Liên hệ: contact@han-news.com</span>
//               </div>
//             </div>

//           </div>
//         ) : (
//            <div className="text-center py-20">
//              <p className="text-gray-500 text-lg">Chưa có bài viết nào được đăng tải.</p>
//            </div>
//         )}
//       </section>
//     </DefaultLayout>
//   );
// }