import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import AdminTheme from "./AdminTheme";
import styled from "@mui/material/styles/styled";

const baseUrl = "https://localhost:60016/";
function ProviderForm() {
  const [providerData, setProviderData] = useState({
    name: "",
    description: "",
    website: "",
    phoneNumber: "",
    city: "",
    address: "",
  });

  const handleChange = (prop) => (event) => {
    setProviderData({ ...providerData, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(providerData);
    fetch(`${baseUrl}api/Provider`, {
      method: "POST",
      body: JSON.stringify(providerData),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  return (
    <ThemeProvider theme={AdminTheme}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Create Provider</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={providerData.name}
                onChange={handleChange("name")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                fullWidth
                value={providerData.description}
                onChange={handleChange("description")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                fullWidth
                value={providerData.website}
                onChange={handleChange("website")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                fullWidth
                value={providerData.phoneNumber}
                onChange={handleChange("phoneNumber")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                value={providerData.city}
                onChange={handleChange("city")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                fullWidth
                value={providerData.address}
                onChange={handleChange("address")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
          >
            Create Provider
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
}

export default ProviderForm;
