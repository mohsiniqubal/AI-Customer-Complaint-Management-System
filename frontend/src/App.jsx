import DashboardStats from "./components/DashboardStats";
import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import api from "./services/api";
import Dashboard from "./components/Dashboard";

function App() {
  const [complaint,setComplaint]=useState("");
  const [pdfFile,setPdfFile]=useState(null);
  const [result,setResult]=useState({
    customer_name:"",
    product_name:"",
    batch_number:"",
    complaint_summary:"",
    risk_level:"",
    recommendation:"",
  });

  const analyzeComplaint=async()=>{
    try{
      const res=await api.post("/ai/extract",{complaint});
      setResult(res.data);
    }catch(e){console.error(e);alert("AI Analysis Failed");}
  };

  const uploadPdf=async()=>{
    if(!pdfFile){alert("Please select a PDF.");return;}
    const fd=new FormData();
    fd.append("file",pdfFile);
    try{
      const res=await api.post("/pdf/upload",fd);
      setComplaint(res.data.extracted_text);
      const ai=typeof res.data.ai_result==="string"?JSON.parse(res.data.ai_result):res.data.ai_result;
      setResult(ai);
      alert("PDF analyzed successfully!");
    }catch(e){console.error(e);alert("PDF upload failed.");}
  };

  const saveComplaint=async()=>{
    try{
      await api.post("/complaints/",{
        customer_name:result.customer_name,
        email:null,
        product_name:result.product_name,
        batch_number:result.batch_number,
        complaint,
        complaint_summary:result.complaint_summary,
        risk_level:result.risk_level,
        recommendation:result.recommendation
      });
      alert("Complaint Saved Successfully!");
    }catch(e){console.error(e);alert("Failed to Save Complaint");}
  };

  return (
    <Container maxWidth="xl" sx={{mt:5,mb:5}}>
      <DashboardStats />
      <Paper sx={{p:4}} elevation={4}>
        <Typography variant="h4" align="center" gutterBottom>
          🤖 AI Customer Complaint Management System
        </Typography>

        <Typography variant="h6" sx={{mt:2}}>Upload Complaint PDF</Typography>

        <input type="file" accept=".pdf" onChange={(e)=>setPdfFile(e.target.files[0])}/>

        <Button fullWidth variant="contained" color="secondary" sx={{mt:2}} onClick={uploadPdf}>
          Upload & Analyze PDF
        </Button>

        <TextField fullWidth multiline rows={6} sx={{mt:3}}
          label="Customer Complaint"
          value={complaint}
          onChange={(e)=>setComplaint(e.target.value)}
        />

        <Button fullWidth variant="contained" sx={{mt:2}} onClick={analyzeComplaint}>
          Analyze with AI
        </Button>

        <Grid container spacing={2} sx={{mt:3}}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Customer Name" value={result.customer_name} InputProps={{readOnly:true}}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Product Name" value={result.product_name} InputProps={{readOnly:true}}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Batch Number" value={result.batch_number} InputProps={{readOnly:true}}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Risk Level" value={result.risk_level} InputProps={{readOnly:true}}/>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Complaint Summary" value={result.complaint_summary} InputProps={{readOnly:true}}/>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={4} label="Recommendation" value={result.recommendation} InputProps={{readOnly:true}}/>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="success" onClick={saveComplaint}>
              Save Complaint
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dashboard/>
    </Container>
  );
}

export default App;
