import { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import api from "../services/api";

function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    investigation: 0,
    closed: 0,
    critical: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get("/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Card = ({ title, value, color }) => (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        textAlign: "center",
        background: color,
        color: "white",
        borderRadius: 3,
      }}
    >
      <Typography variant="h6">{title}</Typography>

      <Typography variant="h3" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, md: 2.4 }}>
        <Card title="Total" value={stats.total} color="#1976d2" />
      </Grid>

      <Grid size={{ xs: 12, md: 2.4 }}>
        <Card title="Open" value={stats.open} color="#43a047" />
      </Grid>

      <Grid size={{ xs: 12, md: 2.4 }}>
        <Card
          title="Investigation"
          value={stats.investigation}
          color="#fb8c00"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 2.4 }}>
        <Card title="Closed" value={stats.closed} color="#8e24aa" />
      </Grid>

      <Grid size={{ xs: 12, md: 2.4 }}>
        <Card title="Critical" value={stats.critical} color="#d32f2f" />
      </Grid>
    </Grid>
  );
}

export default DashboardStats;