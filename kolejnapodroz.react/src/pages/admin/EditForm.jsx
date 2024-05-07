import React from "react";
import { Container } from "@mui/material";
import { FormControl } from "@mui/base/FormControl";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import AdminTheme from "./AdminTheme";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  marginTop: "10%",
}));

function EditForm({ data, onSubmit }) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [stations, setStations] = useState([]);

  const [editedConnection, setEditedConnection] = useState({
    StartStationId: data != null ? data.StartStationId : 0,
    EndStationId: data != null ? data.EndStationId : 0,
    ProviderId: data != null ? data.ProviderId : 0,
    DepartureTime: data != null ? data.DepartureTime : "01.01.2000 00:00:00",
    TravelTime: data != null ? data.TravelTime : 0,
    Points: data != null ? data.Points : 0,
    Price: data != null ? data.Price : 0,
  });

  useEffect(() => {
    fetch(`${baseUrl}/station`)
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleChange = (prop) => (event) => {
    setEditedConnection({ ...editedConnection, [prop]: event.target.value });
    console.log(editedConnection);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(editedConnection);
  };

  return (
    <ThemeProvider theme={AdminTheme}>
      <FormGrid>
        <Container>
            <Typography variant="h5" sx={{
                color: 'rgb(128, 61, 33)',
                      fontWeight: 'bold',
                marginBottom: '25px',
            }}>
              Edit Connection</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <InputLabel id="start-select-label">Start station</InputLabel>
                  <Select
                    labelId="start-select-label"
                    value={editedConnection.StartStationId}
                    fullWidth
                    onChange={handleChange("StartStationId")}
                  >
                    <MenuItem value={0}>None</MenuItem>
                    {stations &&
                      stations.map((station) => (
                        <MenuItem key={station.id} value={station.id}>
                          {station.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <InputLabel id="end-select-label">End station</InputLabel>
                  <Select
                    value={editedConnection.EndStationId}
                    fullWidth
                    onChange={handleChange("EndStationId")}
                  >
                    <MenuItem value={0}>None</MenuItem>
                    {stations &&
                      stations.map((station) => (
                        <MenuItem key={station.id} value={station.id}>
                          {station.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Departure Time"
                  type="datetime-local"
                  fullWidth
                  value={editedConnection.DepartureTime}
                  onChange={handleChange("DepartureTime")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={"Travel Time"}
                  fullWidth
                  value={editedConnection.TravelTime}
                  onChange={(e) =>
                    setEditedConnection({
                      ...editedConnection,
                      ["TravelTime"]: parseInt(e.target.value),
                    })
                  }
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: "1",
                    min: "0",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={"Provider Id"}
                  value={editedConnection.ProviderId}
                  onChange={(e) =>
                    setEditedConnection({
                      ...editedConnection,
                      ["ProviderId"]: parseInt(e.target.value),
                    })
                  }
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: "1",
                    min: "1",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label={"Points"}
                    value={editedConnection.Points}
                    onChange={(e) =>
                        setEditedConnection({
                            ...editedConnection,
                            ["Points"]: parseInt(e.target.value),
                        })
                    }
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: "1",
                        min: "0",
                    }}
                />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <TextField
                                  fullWidth
                                  label={"Price"}
                                  value={editedConnection.Points}
                                  onChange={(e) =>
                                      setEditedConnection({
                                          ...editedConnection,
                                          ["Price"]: parseInt(e.target.value),
                                      })
                                  }
                                  type="number"
                                  InputLabelProps={{
                                      shrink: true,
                                  }}
                                  inputProps={{
                                      step: "1",
                                      min: "0",
                                  }}
                              />
                          </Grid>
            </Grid>
            <Grid item xs={12} sx={{ m: 2 }}>
              <Button type="submit" variant="contained" color="primary" style={{color: 'white', backgroundColor: 'rgb(128, 61, 33)', marginTop: '30px' }}>
                Save
              </Button>
            </Grid>
          </form>
        </Container>
      </FormGrid>
    </ThemeProvider>
  );
}

export default EditForm;
