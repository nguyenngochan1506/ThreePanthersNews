import React from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Post } from "@/types";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
    post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const navigate = useNavigate();

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
            onPress={() => navigate(`/post/${post.slug}`)} 
        >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold text-primary">
                    {post.category?.name || "Tin tức"}
                </p>

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
                    src={post.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                    width={300} 
                />
                <p className="mt-2 text-sm text-gray-500 line-clamp-3 text-left">
                    {post.summary}
                </p>
            </CardBody>
        </Card>
    );
};
