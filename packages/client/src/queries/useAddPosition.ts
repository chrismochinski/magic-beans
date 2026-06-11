/**
 * @file useAddPosition mutation hook.
 * @description
 * The WRITE side of TanStack Query. `useQuery` reads data; `useMutation` changes it (POST/PUT/
 * DELETE). It gives you `mutate(input)` to fire the change, plus `isPending`/`isError` state.
 *
 * The important part is `onSuccess`: after the purchase saves, we call
 * `queryClient.invalidateQueries({ queryKey: ["holdings"] })`. That marks the holdings cache as
 * stale, so TanStack automatically refetches it - and the dashboard updates on its own. In the old
 * Redux+Saga world this was a manual "now dispatch a re-fetch" step; here it's one line, and any
 * component showing holdings refreshes for free.
 * @author Chris "Mo" Mochinski
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewPositionInput } from "@magic-beans/shared";
import { addPosition } from "../api/crypto";

/** Records a new purchase, then invalidates the holdings cache so the dashboard refetches. */
export function useAddPosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewPositionInput) => addPosition(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
    },
  });
}
