/**
 * @file useDeleteAllForCoin mutation hook.
 * @description Deletes every purchase of a given coin (wipes the whole position), then invalidates
 * holdings. Uses the delete-by-coin route.
 * @author Chris "Mo" Mochinski
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllPositionsForCoin } from "../api/crypto";

/** Deletes all purchases of one coin and refreshes holdings. */
export function useDeleteAllForCoin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (coinId: string) => deleteAllPositionsForCoin(coinId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
    },
  });
}
