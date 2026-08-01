import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  Chip,
  Grid,
} from "@mui/material";

import api from "../services/api";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("All");

  // Load complaints
  const loadComplaints = async () => {
    try {
      const response = await api.get("/complaints/search", {
        params: {
          q: search,
          risk: risk,
        },
      });

      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/complaints/${id}/status`, {
        status,
      });

      loadComplaints();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [search, risk]);

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Complaint Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search Customer / Product / Batch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            select
            fullWidth
            label="Risk Filter"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Customer</b>
            </TableCell>

            <TableCell>
              <b>Product</b>
            </TableCell>

            <TableCell>
              <b>Batch</b>
            </TableCell>

            <TableCell>
              <b>Risk</b>
            </TableCell>

            <TableCell>
              <b>Status</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {complaints.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.customer_name}</TableCell>

              <TableCell>{item.product_name}</TableCell>

              <TableCell>{item.batch_number}</TableCell>

              <TableCell>
                <Chip
                  label={item.risk_level}
                  size="small"
                  color={
                    item.risk_level === "Critical"
                      ? "error"
                      : item.risk_level === "High"
                      ? "warning"
                      : item.risk_level === "Medium"
                      ? "info"
                      : "success"
                  }
                />
              </TableCell>

              <TableCell>
                <TextField
                  select
                  size="small"
                  value={item.status}
                  onChange={(e) =>
                    updateStatus(item.id, e.target.value)
                  }
                >
                  <MenuItem value="Open">Open</MenuItem>

                  <MenuItem value="Under Investigation">
                    Under Investigation
                  </MenuItem>

                  <MenuItem value="Closed">Closed</MenuItem>
                </TextField>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Dashboard;