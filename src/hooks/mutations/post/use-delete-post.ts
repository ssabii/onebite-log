import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    ...callbacks,
    onSuccess: async (deletedPost) => {
      callbacks?.onSuccess?.();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        const path = `${deletedPost.author_id}/${deletedPost.id}`;
        await deleteImagesInPath(path);
      }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
  });
}
