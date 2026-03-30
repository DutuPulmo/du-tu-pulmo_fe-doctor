import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";

export const REVIEW_KEYS = {
  all: ["reviews"] as const,
  myReviews: ["reviews", "me"] as const,
};

export function useMyReviews() {
  return useQuery({
    queryKey: REVIEW_KEYS.myReviews,
    queryFn: () => reviewService.getMyReviews(),
  });
}

export function useRespondToReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, response }: { id: string; response: string }) =>
      reviewService.respondToReview(id, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEW_KEYS.myReviews });
    },
  });
}
