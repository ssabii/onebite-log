import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";
import { useUpdateComment } from "@/hooks/mutations/comment/use-update-comment";

type CreateMode = {
  type: "CREATE";
  postId: number;
};

type EditMode = {
  type: "EDIT";
  commentId: number;
  initialContent: string;
  onClose?: () => void;
};

type ReplyMode = {
  type: "REPLY";
  postId: number;
  parentCommentId: number;
  rootCommentId: number;
  onClose?: () => void;
};

type Props = CreateMode | EditMode | ReplyMode;

export default function CommentEditor(props: Props) {
  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCreateComment({
      onSuccess: () => {
        setContent("");
        if (props.type === "REPLY") props.onClose?.();
      },
      onError: () => {
        toast.error("댓글 추가에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const { mutate: updateComment, isPending: isUpdateCommentPending } =
    useUpdateComment({
      onSuccess: () => {
        (props as EditMode).onClose?.();
      },
      onError: () => {
        toast.error("댓글 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const [content, setContent] = useState("");

  const { type } = props;
  const initialContent = type === "EDIT" ? props.initialContent : undefined;

  useEffect(() => {
    if (initialContent !== undefined) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    if (type === "CREATE") {
      createComment({
        postId: props.postId,
        content,
      });
    } else if (type === "REPLY") {
      createComment({
        postId: props.postId,
        content,
        parentCommentId: props.parentCommentId,
        rootCommentId: props.rootCommentId,
      });
    } else {
      updateComment({
        id: props.commentId,
        content,
      });
    }
  };

  const isPending = isCreateCommentPending || isUpdateCommentPending;

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        disabled={isPending}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        {type === "EDIT" ||
          (type === "REPLY" && (
            <Button
              variant="outline"
              onClick={props.onClose}
              disabled={isPending}
            >
              취소
            </Button>
          ))}
        <Button disabled={isPending} onClick={handleSubmitClick}>
          작성
        </Button>
      </div>
    </div>
  );
}
