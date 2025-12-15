// import { useEffect, useState } from 'react';
// import { Spinner } from '@heroui/react';

// import { PostCard } from '@/components/index/PostCard';
// import { TopStoryCard } from '@/components/index/TopStoryCard';
// import { SidebarNewsList } from '@/components/index/SidebarNewsList';
// import { postService } from '@/services/post.service';
// import { Post, PostFilter } from '@/types';

// export default function IndexPage() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const filter: PostFilter = {
//           pageNo: 0,
//           pageSize: 321,
//         };

//         const response = await postService.getPosts(filter);

//         if (response && response.data && response.data.items) {
//           setPosts(response.data.items);
//         } else {
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error('Lỗi tải bài viết:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center mt-20">
//         <Spinner size="lg" />
//       </div>
//     );
//   if (posts.length === 0)
//     return (
//       <div className="text-center mt-20 text-gray-500">
//         Chưa có bài viết nào.
//       </div>
//     );

//   const topStory = posts[0];
//   const mainPosts = posts.slice(1, 11);
//   const sidebarPosts = posts.slice(7, 15);

//   return (
//     <section className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2">
//           {topStory && <TopStoryCard post={topStory} />}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//             {mainPosts.map((post) => (
//               <PostCard key={post.id} post={post} />
//             ))}
//           </div>
//         </div>

//         <div className="lg:col-span-1">
//           <div className="mb-8">
//             <img
//               alt="Sự kiện"
//               className="w-full rounded"
//               src="https://nld.mediacdn.vn/thumb_w/300/2023/5/12/sea-games-32-16838609866721552887330.jpg"
//             />
//           </div>

//           {sidebarPosts.length > 0 && (
//             <SidebarNewsList posts={sidebarPosts} title="TIN NÓNG" />
//           )}

//           <div className="bg-gray-100 p-4 text-center text-gray-500 min-h-[200px] flex items-center justify-center">
//             Khu vực Quảng Cáo
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState, useMemo } from 'react';
import { Spinner } from '@heroui/react';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight } from 'lucide-react';

import { postService } from '@/services/post.service';
import { Post, PostFilter } from '@/types';
import { TopStoryCard } from '@/components/index/TopStoryCard';
import { PostCard } from '@/components/index/PostCard';
import { SidebarNewsList } from '@/components/index/SidebarNewsList';

const PLACEHOLDER = 'https://via.placeholder.com/600x400?text=No+Image';

// 1. CUSTOM HOOK
const useNewsData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .getPosts({ pageNo: 0, pageSize: 100 } as PostFilter)
      .then((res) => setPosts(res?.data?.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Logic chia nhóm dữ liệu (Memoized)
  const data = useMemo(() => {
    if (!posts.length) return {};

    // Helper lọc tag
    const getByTag = (tag: string) =>
      posts.filter((p) => p.tags?.some((t) => t.slug.includes(tag)));
    // Helper gom category
    const cats: Record<string, Post[]> = {};

    posts.forEach((p) => {
      const cName = p.category?.name;

      if (cName) {
        if (!cats[cName]) cats[cName] = [];
        if (cats[cName].length < 4) cats[cName].push(p);
      }
    });

    return {
      hero: posts[0],
      subFeatured: posts.slice(1, 4),
      sidebarHot: posts.slice(4, 9),
      mainStream: posts.slice(9),
      trending: {
        'truy-na': getByTag('truy-na'),
        'xo-so': getByTag('xo-so'),
        'chinh-tri': getByTag('nha-nuoc'),
      },
      categories: cats,
    };
  }, [posts]);

  return { posts, loading, ...data };
};

// 2. SUB-COMPONENTS
const SectionTitle = ({ title, icon: Icon }: { title: string; icon?: any }) => (
  <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
    {Icon && <Icon className="text-red-600" size={20} />}
    <span className="w-1.5 h-6 bg-red-600 rounded-sm block md:hidden" />
    <h2 className="text-xl font-bold uppercase text-gray-900 flex-1">
      {title}
    </h2>
    <Link
      className="text-xs text-gray-500 hover:text-red-600 flex items-center"
      to="#"
    >
      Xem thêm <ChevronRight size={14} />
    </Link>
  </div>
);

const SmallPostItem = ({ post }: { post: Post }) => (
  <Link
    className="group flex gap-3 items-start py-2 border-b border-gray-50 last:border-0"
    to={`/post/${post.slug}`}
  >
    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0 group-hover:bg-blue-600 transition-colors" />
    <h4 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-2 leading-relaxed">
      {post.title}
    </h4>
  </Link>
);

// 3. MAIN COMPONENT
export default function IndexPage() {
  const {
    loading,
    hero,
    subFeatured,
    sidebarHot,
    mainStream,
    trending,
    categories,
    posts,
  } = useNewsData();
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeTab, setActiveTab] = useState('truy-na');

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* SECTION: TRENDING BAR */}
      <section className="bg-gray-50 py-3 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 font-bold text-gray-800 text-sm uppercase shrink-0">
            <TrendingUp className="text-red-600" size={18} /> Tiêu điểm:
          </div>
          <div className="flex gap-2">
            {['truy-na', 'xo-so', 'chinh-tri'].map((t) => (
              <button
                key={t}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${activeTab === t ? 'bg-red-600 text-white' : 'bg-white border text-gray-600'}`}
                onClick={() => setActiveTab(t)}
              >
                {t === 'truy-na'
                  ? 'Truy nã'
                  : t === 'xo-so'
                    ? 'Xổ số'
                    : 'Chính trị'}
              </button>
            ))}
          </div>
          {trending?.[activeTab as keyof typeof trending]?.[0] && (
            <Link
              className="text-sm font-medium hover:text-red-600 truncate flex-1 min-w-0"
              to={`/post/${trending[activeTab as keyof typeof trending][0].slug}`}
            >
              🔥 {trending[activeTab as keyof typeof trending][0].title}
            </Link>
          )}
        </div>
      </section>

      {/* SECTION: MAIN CONTENT */}
      <section className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-9">
            {/* Hero + SubFeatured */}
            <div className="mb-12 border-b border-gray-100 pb-10">
              {hero && <TopStoryCard post={hero} />}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {subFeatured?.map((p) => (
                  <div key={p.id} className="group">
                    <Link
                      className="block h-36 rounded-lg overflow-hidden mb-2"
                      to={`/post/${p.slug}`}
                    >
                      <img
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        src={p.thumbnail || PLACEHOLDER}
                      />
                    </Link>
                    <h3 className="font-bold text-sm group-hover:text-blue-600 line-clamp-3">
                      <Link to={`/post/${p.slug}`}>{p.title}</Link>
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Stream List */}
            <SectionTitle title="Tin mới cập nhật" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {mainStream
                ?.slice(0, visibleCount)
                .map((p) => <PostCard key={p.id} post={p} />)}
            </div>
            {posts.length > 9 + visibleCount && (
              <div className="text-center mt-12">
                <button
                  className="px-8 py-3 rounded-full border hover:bg-gray-50 font-semibold text-gray-600 text-sm"
                  onClick={() => setVisibleCount((v) => v + 10)}
                >
                  Xem thêm tin cũ hơn
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-3 sticky top-20 h-fit">
            {sidebarHot && sidebarHot.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <SidebarNewsList posts={sidebarHot} title="ĐÁNG CHÚ Ý" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION: CATEGORIES */}
      <section className="container mx-auto px-4 py-12 mt-12 bg-gray-50 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-x divide-gray-200">
          {Object.entries(categories || {}).map(([name, items], idx) => (
            <div key={name} className={idx > 0 ? 'pl-10' : ''}>
              <SectionTitle title={name} />
              {items[0] && (
                <Link
                  className="block group mb-4"
                  to={`/post/${items[0].slug}`}
                >
                  <div className="h-40 rounded-lg overflow-hidden mb-3 bg-gray-200">
                    <img
                      alt={items[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      src={items[0].thumbnail || PLACEHOLDER}
                    />
                  </div>
                  <h3 className="font-bold text-lg leading-snug group-hover:text-blue-600">
                    {items[0].title}
                  </h3>
                </Link>
              )}
              <div className="flex flex-col gap-2">
                {items.slice(1).map((p) => (
                  <SmallPostItem key={p.id} post={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
