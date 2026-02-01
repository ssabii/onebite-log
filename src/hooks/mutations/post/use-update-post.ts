import { updatePost } from "@/api/post";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updatePost,
    ...callbacks,
  });
}
