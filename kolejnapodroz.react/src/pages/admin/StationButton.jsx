import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function StationButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => {
        navigate("/add-station");
      }}
      sx={{ m: 1, backgroundColor: 'rgb(128, 61, 33)' }}
      >
      Add new station
    </Button>
  );
}

export default StationButton;
