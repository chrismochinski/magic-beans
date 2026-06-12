/**
 * @file useUpdatePosition mutation hook.
 * @description Updates how many coins a single purchase was for (the "oops, wrong number" fix), then
 * invalidates holdings so the dashboard refetches.
 * @author Chris "Mo" Mochinski
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePosition } from "../api/crypto";

/** Updates one purchase's quantity and refreshes holdings. */
export function useUpdatePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, coinsPurchased }: { id: number; coinsPurchased: number }) =>
      updatePosition(id, coinsPurchased),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
    },
  });
}
