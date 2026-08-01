import DashboardStats from "./components/DashboardStats";
import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

import api from "./services/api";
import Dashboard from "./components/Dashboard";

function App() {
  const [complaint, setComplaint] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [result, setResult] = useState({
    customer_name: "",
    product_name: "",
    batch_number: "",
    complaint_summary: "",
    risk_level: "",
    recommendation: "",
  });

  // ===============================
  // Manual AI Analysis
  // ===============================
  const analyzeComplaint = async () => {

    if (!complaint.trim()) {
      alert("Please enter a complaint.");
      return;
    }

    try {

      const res = await api.post("/ai/extract", {
        complaint,
      });

      if (res.data.valid_complaint === false) {
        alert(res.data.message);
        return;
      }

      setResult({
        customer_name: res.data.customer_name || "",
        product_name: res.data.product_name || "",
        batch_number: res.data.batch_number || "",
        complaint_summary: res.data.complaint_summary || "",
        risk_level: res.data.risk_level || "",
        recommendation: res.data.recommendation || "",
      });

    } catch (e) {

      console.error("FULL ERROR:", e);

      if (e.response) {
        console.log("Status:", e.response.status);
        console.log("Response:", e.response.data);

        alert(JSON.stringify(e.response.data));
      } else if (e.request) {
        alert("No response received from backend.");
      } else {
        alert(e.message);
      }

    }
  };

  // ===============================
  // Upload PDF
  // ===============================
  const uploadPdf = async () => {

    if (!pdfFile) {
      alert("Please select a PDF.");
      return;
    }

    const fd = new FormData();
    fd.append("file", pdfFile);

    try {

      const res = await api.post("/pdf/upload", fd);

      if (res.data.error) {
        alert(res.data.message);
        return;
      }

      setComplaint(res.data.extracted_text);

      let ai = res.data.ai_result;

      if (typeof ai === "string") {
        ai = JSON.parse(ai);
      }

      setResult({
        customer_name: ai.customer_name || "",
        product_name: ai.product_name || "",
        batch_number: ai.batch_number || "",
        complaint_summary: ai.complaint_summary || "",
        risk_level: ai.risk_level || "",
        recommendation: ai.recommendation || "",
      });

      alert("✅ PDF analyzed successfully!");

    } catch (e) {

      console.error("UPLOAD ERROR:", e);

      if (e.response) {
        alert(JSON.stringify(e.response.data));
      } else if (e.request) {
        alert("No response received from backend.");
      } else {
        alert(e.message);
      }

    }
  };
  // ===============================
  // Save Complaint
  // ===============================
  const saveComplaint = async () => {

    if (
      !result.customer_name ||
      !result.product_name ||
      !result.batch_number ||
      !result.risk_level
    ) {
      alert("Please analyze a valid pharmaceutical complaint before saving.");
      return;
    }

    try {

      await api.post("/complaints/", {
        customer_name: result.customer_name,
        email: null,
        product_name: result.product_name,
        batch_number: result.batch_number,
        complaint: complaint,
        complaint_summary: result.complaint_summary,
        risk_level: result.risk_level,
        recommendation: result.recommendation,
      });

      alert("✅ Complaint Saved Successfully!");

      window.location.reload();

    } catch (e) {

      console.error("SAVE ERROR:", e);

      if (e.response) {
        alert(JSON.stringify(e.response.data));
      } else if (e.request) {
        alert("No response received from backend.");
      } else {
        alert(e.message);
      }

    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>

      <DashboardStats />

      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          🤖 AI Customer Complaint Management System
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Upload Complaint PDF
        </Typography>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={uploadPdf}
        >
          Upload & Analyze PDF
        </Button>

        <TextField
          fullWidth
          multiline
          rows={6}
          sx={{ mt: 3 }}
          label="Customer Complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={analyzeComplaint}
        >
          Analyze with AI
        </Button>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Customer Name"
              value={result.customer_name}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Name"
              value={result.product_name}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Batch Number"
              value={result.batch_number}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Risk Level"
              value={result.risk_level}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Complaint Summary"
              value={result.complaint_summary}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Recommendation"
              value={result.recommendation}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              disabled={
                !result.customer_name ||
                !result.product_name ||
                !result.batch_number
              }
              onClick={saveComplaint}
            >
              Save Complaint
            </Button>
          </Grid>
        </Grid>

      </Paper>

      <Dashboard />

    </Container>
  );
}

export default App;