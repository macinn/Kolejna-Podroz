import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import AdminTheme from "./AdminTheme";
import backgroundImage from '../../media/trainBlur.jpg';

const baseUrl = import.meta.env.VITE_API_URL;
function StationForm({ onSubmit }) {
  const [stationData, setStationData] = useState({
    name: "",
    description: "",
    code: "",
    city: "",
  });

  const handleChange = (prop) => (event) => {
    setStationData({ ...stationData, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stationData);
    fetch(`${baseUrl}/Station`, {
      method: "POST",
      body: JSON.stringify(stationData),
      headers: {
        "Content-type": "application/json",
      },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Wyst�pi� problem podczas przetwarzania ��dania.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Poprawnie dodano station:', data);
            window.alert('Poprawnie dodano station');
        })
        .catch(error => {
            console.error('Wyst�pi� b��d:', error);
            window.alert('Wystapil blad podczas dodawania station');
        });
  };

  return (
    <ThemeProvider theme={AdminTheme}>
          <Container sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: `center`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              mt: 4
          }}>
        <Typography variant="h5" sx={{
            color: 'rgb(128, 61, 33)',
            fontWeight: 'bold',
            marginBottom: '25px',
            marginTop: '110px',
        }}>
            Create Station
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={stationData.name}
                onChange={handleChange("name")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                fullWidth
                value={stationData.description}
                onChange={handleChange("description")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Code"
                fullWidth
                value={stationData.code}
                onChange={handleChange("code")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                value={stationData.city}
                onChange={handleChange("city")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
            style={{ color: 'white', backgroundColor: 'rgb(128, 61, 33)', marginTop: '30px' }}
          >
            Create Station
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
}

export default StationForm;
