/**
 * @file Root App component.
 * @description
 * For now: the portfolio dashboard. Routing for additional pages (coin search, etc.) gets added as
 * we build them.
 * @author Chris "Mo" Mochinski
 */

import { Box, Container, Typography } from "@mui/material";
import { HoldingsDashboard } from "./components/HoldingsDashboard";

/** The app's root component. */
export function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Magic Beans 🌱
      </Typography>
      <Typography color="text.secondary">Your crypto portfolio</Typography>
      <Box sx={{ mt: 3 }}>
        <HoldingsDashboard />
      </Box>
    </Container>
  );
}
