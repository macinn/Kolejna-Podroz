import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProviderButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => {
        navigate("/add-provider");
      }}
      sx={{ m: 1, backgroundColor: 'rgb(128, 61, 33)' }}
      >
      Add provider
    </Button>
  );
}

export default ProviderButton;
