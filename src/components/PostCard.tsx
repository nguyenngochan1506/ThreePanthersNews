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
