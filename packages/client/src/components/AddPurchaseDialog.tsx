/**
 * @file AddPurchaseDialog component.
 * @description
 * A modal for recording a purchase of a chosen coin. It captures the coin's CURRENT price as the
 * `pricePerFullCoin` (frozen at this moment as the cost basis), takes a quantity, and submits via
 * the `useAddPosition` mutation. The open/selected state is plain React `useState` in the parent -
 * that's UI state, not server state, so TanStack Query stays out of it.
 * @author Chris "Mo" Mochinski
 */

import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import type { MarketCoin } from "@magic-beans/shared";
import { useAddPosition } from "../queries/useAddPosition";
import { usd } from "../lib/format";

interface AddPurchaseDialogProps {
  /** The coin being purchased, or null when the dialog is closed. */
  coin: MarketCoin | null;
  /** Whether the dialog is open. */
  open: boolean;
  /** Called to close the dialog. */
  onClose: () => void;
}

/** Modal form to record a new purchase of `coin` at its current price. */
export function AddPurchaseDialog({ coin, open, onClose }: AddPurchaseDialogProps) {
  const [quantity, setQuantity] = useState("");
  const addPosition = useAddPosition();

  const qtyNum = Number(quantity);
  const validQty = quantity !== "" && qtyNum > 0;
  const total = coin && validQty ? qtyNum * coin.currentPrice : 0;

  const handleClose = () => {
    setQuantity("");
    addPosition.reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!coin || !validQty) return;
    addPosition.mutate(
      { coinId: coin.id, coinsPurchased: qtyNum, pricePerFullCoin: coin.currentPrice },
      { onSuccess: handleClose },
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {coin && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={coin.image} alt={coin.name} sx={{ width: 28, height: 28 }} />
            Add {coin.name} ({coin.symbol.toUpperCase()})
          </Box>
        )}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Buying at the current price of <b>{coin ? usd(coin.currentPrice) : ""}</b> per coin.
        </Typography>
        <TextField
          label="How many coins?"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          autoFocus
          inputProps={{ min: 0, step: "any" }}
        />
        {validQty && (
          <Typography sx={{ mt: 2 }}>
            Total cost: <b>{usd(total)}</b>
          </Typography>
        )}
        {addPosition.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Couldn't add that purchase. Try again.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!validQty || addPosition.isPending}
        >
          {addPosition.isPending ? "Adding..." : "Add purchase"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
