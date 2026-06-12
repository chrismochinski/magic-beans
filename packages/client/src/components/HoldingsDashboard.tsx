/**
 * @file HoldingsDashboard component.
 * @description
 * The portfolio table - a modern MUI v6 reimagining of the 2021 UserHoldings table. Pulls data via
 * the `useHoldings` query hook, aggregates purchases per coin, and shows held amount, cost basis,
 * current value, and gain/loss (green/red), plus a grand total. Loading and error states come
 * straight off the query - no manual flags.
 * @author Chris "Mo" Mochinski
 */

import { useState, Fragment } from "react";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Collapse,
  Paper,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import { useHoldings } from "../queries/useHoldings";
import { aggregateHoldings } from "../lib/aggregateHoldings";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

/** Formats a number as USD currency. */
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/** The portfolio holdings table with per-coin rollups and a grand total. */
export function HoldingsDashboard() {
  const { data: positions, isLoading, isError, error } = useHoldings();
  const [openCoin, setOpenCoin] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Couldn't load holdings: {(error as Error).message}</Alert>;
  }

  const holdings = aggregateHoldings(positions ?? []);

  if (holdings.length === 0) {
    return (
      <Typography color="text.secondary">
        No holdings yet - add a purchase to get started.
      </Typography>
    );
  }

  const grandValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const grandInvested = holdings.reduce((sum, h) => sum + h.totalInvested, 0);
  const grandGain = grandValue - grandInvested;

  return (
    <Paper elevation={4} sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 3 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Held</TableCell>
              <TableCell align="right">Invested</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Gain / Loss</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdings.map((h) => (
              <Fragment key={h.coinId}>
                <TableRow hover>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => setOpenCoin(openCoin === h.coinId ? null : h.coinId)}>
                      {openCoin === h.coinId ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar src={h.image} alt={h.name} sx={{ width: 24, height: 24 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {h.symbol.toUpperCase()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {h.name}
                          {h.purchaseCount > 1 ? ` (${h.purchaseCount} buys)` : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {h.totalCoins.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </TableCell>
                  <TableCell align="right">{usd(h.totalInvested)}</TableCell>
                  <TableCell align="right">{usd(h.currentValue)}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: h.gainLoss >= 0 ? "success.main" : "error.main",
                      fontWeight: 600,
                    }}>
                    {usd(h.gainLoss)} ({h.gainLossPct.toFixed(1)}%)
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={6} sx={{ py: 0, border: 0 }}>
                    <Collapse in={openCoin === h.coinId} timeout="auto" unmountOnExit>
                      {/* sub-table: this coin's individual purchases + edit/delete per row,
              plus a red "Delete entire position" button */}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: { xs: 1, sm: 3 },
          mt: 2,
          pr: 1,
        }}>
        <Typography>
          Total value: <b>{usd(grandValue)}</b>
        </Typography>
        <Typography sx={{ color: grandGain >= 0 ? "success.main" : "error.main" }}>
          Total gain/loss: <b>{usd(grandGain)}</b>
        </Typography>
      </Box>
    </Paper>
  );
}
