import React from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import EditForm from "./EditForm";

const baseUrl = import.meta.env.VITE_API_URL;
function AddConnection(data) {
    console.log(data);
    fetch(`${baseUrl}/Connection/AdminPost`, {
        method: "POST",
        body: JSON.stringify(data),
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
            console.log('Poprawnie dodano connection:', data);
            window.alert('Poprawnie dodano connection');
        })
        .catch(error => {
            console.error('Wyst�pi� b��d:', error);
            window.alert('Wystapil blad podczas dodawania connection');
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
