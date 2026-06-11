/**
 * @file ExploreTable component.
 * @description
 * The "Explore" market list - a modern take on the 2021 UserPage market table. Pulls the top coins
 * via the `useMarketCoins` hook, lets you filter by name/symbol, and gives each row an "Add" button
 * that opens the purchase dialog. Caps the visible list to keep it snappy.
 * @author Chris "Mo" Mochinski
 */

import { useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import type { MarketCoin } from "@magic-beans/shared";
import { useMarketCoins } from "../queries/useMarketCoins";
import { AddPurchaseDialog } from "./AddPurchaseDialog";
import { usd } from "../lib/format";

const MAX_ROWS = 25;

/** Browsable, searchable market table with an "Add purchase" action per coin. */
export function ExploreTable() {
  const { data: coins, isLoading, isError } = useMarketCoins();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MarketCoin | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = coins ?? [];
    const matched = term
      ? list.filter(
          (c) => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term),
        )
      : list;
    return matched.slice(0, MAX_ROWS);
  }, [coins, search]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Couldn't load market data.</Alert>;
  }

  return (
    <Paper elevation={2} sx={{ p: { xs: 1.5, sm: 2 } }}>
      <TextField
        label="Search coins"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }}
      />
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((coin) => {
              const change = coin.priceChangePercentage24h;
              return (
                <TableRow key={coin.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar src={coin.image} alt={coin.name} sx={{ width: 22, height: 22 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {coin.symbol.toUpperCase()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {coin.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{usd(coin.currentPrice)}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: (change ?? 0) >= 0 ? "success.main" : "error.main" }}
                  >
                    {change != null ? `${change.toFixed(1)}%` : "-"}
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" onClick={() => setSelected(coin)}>
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <AddPurchaseDialog coin={selected} open={selected !== null} onClose={() => setSelected(null)} />
    </Paper>
  );
}
