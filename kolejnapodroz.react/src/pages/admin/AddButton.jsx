import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => {
        navigate("/add-connection");
      }}
          sx={{ m: 1, backgroundColor: 'rgb(128, 61, 33)' }}
    >
      Add new connection
    </Button>
  );
}

export default AddButton;
