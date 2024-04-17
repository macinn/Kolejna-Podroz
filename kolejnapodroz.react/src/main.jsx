import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ConfirmationPage from './pages/confirmation/ConfirmationPage.jsx';
import { Auth0Provider } from "@auth0/auth0-react";
import {BrowserRouter, Route} from 'react-router-dom';

const domain = "dev-smj8b7vj3kgqfm7t.us.auth0.com";
const clientId = "ORNb5eV7D2sZI9Laq6SXrMqYLJF3LgcP";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                redirectUri={window.location.origin}
            >
                <App />
            </Auth0Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
