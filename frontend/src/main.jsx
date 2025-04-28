import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

const googleClientId = import.meta.env.VITE_GOOGLE_CLINET_ID;
const microsoftClientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID;
const microsoftCallbackUrl = import.meta.env.VITE_MICROSOFT_CALLBACK_URL;

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: microsoftClientId,
    redirectUri: microsoftCallbackUrl,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
