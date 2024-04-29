import React from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import EditForm from "./EditForm";

const baseUrl = import.meta.env.VITE_API_URL;
function AddConnection(data) {
  fetch(`${baseUrl}/Connection/AdminPost`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
}
function AddForm() {
  return (
    <Container>
      <EditForm onSubmit={AddConnection} />
    </Container>
  );
}

export default AddForm;
