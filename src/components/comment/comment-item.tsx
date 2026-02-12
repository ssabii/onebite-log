import defaultAvatar from "@/assets/default-avatar.png";
import { formatTimeAgo } from "@/lib/time";
import type { Comment } from "@/types";
import { Link } from "react-router";

export default function CommentItem(props: Comment) {
  const { content, created_at, author } = props;
  const { avatar_url, nickname } = author;
  return (
    <div className={"flex flex-col gap-8 border-b pb-5"}>
      <div className="flex items-start gap-4">
        <Link to={"#"}>
          <div className="flex h-full flex-col">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={avatar_url || defaultAvatar}
            />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">{nickname}</div>
          <div>{content}</div>
          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline">댓글</div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div>{formatTimeAgo(created_at)}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline">수정</div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div className="cursor-pointer hover:underline">삭제</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
