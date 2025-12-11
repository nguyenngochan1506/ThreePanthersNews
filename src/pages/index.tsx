// import { useEffect, useState } from "react";
// import DefaultLayout from "@/layouts/default";
// import  {PostCard}  from "@/components/PostCard";
// import { postService } from "@/services/post.service"; // Kiểm tra lại đường dẫn file này nhé
// import { Post, PostFilter } from "@/types";
// import { Spinner } from "@heroui/react";

// export default function IndexPage() {
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 setLoading(true);

//                 const filter: PostFilter = {
//                     pageNo: 0,
//                     pageSize: 10,
//                     // isFeatured: true, // Bỏ comment nếu muốn lọc
//                 };

//                 // Gọi API
//                 const response = await postService.getPosts(filter);

//                 // 👇 SỬA Ở ĐÂY:
//                 // 1. Dùng response.data (vì ApiResponse bọc trong data)
//                 // 2. Dùng .items (vì Java PageResponse dùng items)
//                 if (response && response.data && response.data.items) {
//                     setPosts(response.data.items);
//                 } else {
//                     setPosts([]); // Nếu null thì set mảng rỗng cho đỡ lỗi
//                 }

//             } catch (error) {
//                 console.error("Lỗi tải bài viết:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//     }, []);

//     if (loading) return <div className="flex justify-center mt-20"><Spinner size="lg" /></div>;

//     return (
//         <DefaultLayout>
//             <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//                 <div className="w-full max-w-6xl">
//                     <h2 className="text-2xl font-bold mb-6">📰 Tin Tức</h2>

//                     {/* Thêm check độ dài mảng để hiển thị thông báo nếu không có bài */}
//                     {posts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                             {posts.map((post) => (
//                                 <PostCard key={post.id} post={post} />
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="text-gray-500 text-center">Chưa có bài viết nào.</p>
//                     )}
//                 </div>
//             </section>
//         </DefaultLayout>
//     );
// }

import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { PostCard } from "@/components/PostCard";
import { TopStoryCard } from "@/components/TopStoryCard"; // Component mới
import { SidebarNewsList } from "@/components/SidebarNewsList"; // Component mới
import { postService } from "@/services/post.service";
import { Post, PostFilter } from "@/types";
import { Spinner } from "@heroui/react";

export default function IndexPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                // Lấy nhiều bài hơn để đủ chia cho các khu vực
                const filter: PostFilter = {
                    pageNo: 0,
                    pageSize: 20,
                };

                const response = await postService.getPosts(filter);
                if (response && response.data && response.data.items) {
                    setPosts(response.data.items);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error("Lỗi tải bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="flex justify-center mt-20"><Spinner size="lg" /></div>;
    if (posts.length === 0) return <DefaultLayout><p className="text-center mt-20">Chưa có bài viết nào.</p></DefaultLayout>;

    // --- PHÂN CHIA DỮ LIỆU ---
    // Bài đầu tiên làm Top Story
    const topStory = posts[0];
    // 6 bài tiếp theo cho phần tin chính bên dưới
    const mainPosts = posts.slice(1, 7);
    // Các bài còn lại cho sidebar "TIN NÓNG"
    const sidebarPosts = posts.slice(7, 15);

    return (
        <DefaultLayout>
            {/* Container chính với padding */}
            <section className="container mx-auto px-4 py-8">

                {/* LAYOUT GRID 2 CỘT: Cột trái to gấp đôi cột phải trên màn hình lớn (lg) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* === CỘT CHÍNH (BÊN TRÁI) - Chiếm 2 phần === */}
                    <div className="lg:col-span-2">
                        {/* 1. Bài viết nổi bật nhất (Top Story) */}
                        {topStory && <TopStoryCard post={topStory} />}

                        {/* 2. Các bài viết khác bên dưới - Grid 2 cột nhỏ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            {mainPosts.map((post) => (
                                // Tái sử dụng PostCard cũ cho phần này là hợp lý
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* === SIDEBAR (BÊN PHẢI) - Chiếm 1 phần === */}
                    <div className="lg:col-span-1">
                        {/* Widget Sự Kiện (Ảnh tĩnh ví dụ) */}
                        <div className="mb-8">
                            <img src="https://nld.mediacdn.vn/thumb_w/300/2023/5/12/sea-games-32-16838609866721552887330.jpg" alt="Sự kiện" className="w-full rounded" />
                        </div>

                        {/* Danh sách TIN NÓNG */}
                        {sidebarPosts.length > 0 && (
                            <SidebarNewsList title="TIN NÓNG" posts={sidebarPosts} />
                        )}

                        {/* Có thể thêm các khối khác như Quảng cáo, Xem nhiều... */}
                        <div className="bg-gray-100 p-4 text-center text-gray-500 min-h-[200px] flex items-center justify-center">
                            Khu vực Quảng Cáo
                        </div>
                    </div>

                </div>
            </section>
        </DefaultLayout>
    );
}