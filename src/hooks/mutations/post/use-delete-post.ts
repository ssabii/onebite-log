import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    ...callbacks,
    onSuccess: async (deletedPost) => {
      callbacks?.onSuccess?.();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        const path = `${deletedPost.author_id}/${deletedPost.id}`;
        await deleteImagesInPath(path);
      }
    },
  });
}
