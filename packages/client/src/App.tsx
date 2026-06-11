/**
 * @file Root App component.
 * @description
 * The single-page portfolio view: holdings dashboard on top, the "Explore" market table below for
 * browsing and adding purchases. Routing for more pages gets added as we build them.
 * @author Chris "Mo" Mochinski
 */

import { Box, Container, Typography } from "@mui/material";
import { HoldingsDashboard } from "./components/HoldingsDashboard";
import { ExploreTable } from "./components/ExploreTable";

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

      <Typography variant="h4" component="h2" sx={{ mt: 5, mb: 2 }}>
        Explore
      </Typography>
      <ExploreTable />
    </Container>
  );
}
