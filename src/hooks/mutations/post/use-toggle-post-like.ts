import { togglePostLike } from "@/api/post";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTogglePostLike(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: togglePostLike,
    ...callbacks,
  });
}
