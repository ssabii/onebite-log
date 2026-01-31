import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/api/post";
import type { UseMutationCallback } from "@/types";

export function useCreatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createPost,
    ...callbacks,
  });
}
