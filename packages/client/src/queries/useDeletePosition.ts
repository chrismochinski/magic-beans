/**
 * @file useDeletePosition mutation hook.
 * @description Deletes a single purchase by id, then invalidates the holdings cache so the dashboard
 * refetches. Same shape as `useAddPosition`, just a different API call.
 * @author Chris "Mo" Mochinski
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePosition } from "../api/crypto";

/** Deletes one purchase by id and refreshes holdings. */
export function useDeletePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePosition(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
    },
  });
}
