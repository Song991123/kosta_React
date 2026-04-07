import React from "react";
import Comment from "./Comment";

export default function CommentList() {
    
    const comments = [
        {
            name : "홍길동",
            comment : " 안녕하세요. 반갑습니다. ",
            profile: `https://api.dicebear.com/7.x/thumbs/svg?seed=hong`
        },
        {
            name : "김철수",
            comment : " 리액트 너무 재밌어요! ",
            profile: `https://api.dicebear.com/7.x/thumbs/svg?seed=kim`
        },
        {
            name : "박영희",
            comment : " 오늘 날씨가 정말 좋네요. ",
            profile: `https://api.dicebear.com/7.x/thumbs/svg?seed=park`
        }
    ];

    return <div>
        {comments.map((comment, index) => (
            <Comment
                key={index}
                profile={comment.profile}
                nameText={comment.name}
                commentText={comment.comment}
            />
        ))}
    </div>;
}
