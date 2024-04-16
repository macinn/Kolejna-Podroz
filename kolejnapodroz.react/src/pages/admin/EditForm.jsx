import React from "react";
import { Container } from "@mui/material";
import { FormControl } from "@mui/base/FormControl";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useEffect } from "react";
import { FormHelperText } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const MuiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      secondary: {
        main: "#f48fb1",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#ffffff",
        secondary: "#bdbdbd",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  },
});

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  marginTop: "10%",
}));

const exampleConnection = {
  id: 1,
  from: {
    id: 1,
    name: "Warszawa Centralna",
    description: "Fajna stacja",
    code: "1",
    city: "Warszawa",
  },
  destination: {
    id: 2,
    name: "Warszawa Zachodnia",
    description: "Niez�a stacja",
    code: "2",
    city: "Warszawa",
  },
  departureTime: "2024-04-16T12:00:00",
  arrivalTime: "2024-04-16T12:00:00",
  provider: null,
};

function EditForm({ data, onSubmit }) {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const baseUrl = "https://localhost:60016/";
  const [stations, setStations] = useState([]);

  const [editedConnection, setEditedConnection] = useState({
    Id: data != null ? data.Id : 0,
    StartStationId: data != null ? data.StartStationId : 0,
    EndStationId: data != null ? data.EndStationId : 0,
    ProviderId: data != null ? data.ProviderId : 0,
    DepartureTime: data != null ? data.DepartureTime : "0001-01-01T00:00:00",
    TravelTime: data != null ? data.TravelTime : 0,
  });
    useEffect(() => {
        if (user == null || user.role != "  Admin")
            navigate("/");
    },[user]);
  useEffect(() => {
    fetch(`${baseUrl}api/station`)
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

    const getCurrentDateTimeString = () => {
        const currentDate = new Date();
        return currentDate.toISOString().slice(0, 16);
    };

  return (
    <ThemeProvider theme={MuiTheme}>
      <FormGrid>
        <Container>
          <Typography variant="h5">Edit Connection</Typography>
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
                  value={getCurrentDateTimeString()}
                  onChange={handleChange("DepartureTime")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={"Travel Time"}
                  fullWidth
                  value={editedConnection.TravelTime}
                  onChange={handleChange("TravelTime")}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={"Provider Id"}
                  value={editedConnection.ProviderId}
                  onChange={handleChange("ProviderId")}
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
              <Button type="submit" variant="contained" color="primary">
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
