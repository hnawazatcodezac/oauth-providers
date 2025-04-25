import { jwtDecode } from "jwt-decode";
import { useMsal } from "@azure/msal-react";
import { GoogleLogin } from "@react-oauth/google";

const linkedinClientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const linkedinCallbackUrl = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;

const LinkedInLogin = () => {
  const handleLinkedInLogin = () => {
    const clientId = linkedinClientId;
    const redirectUri = linkedinCallbackUrl;
    const scope = "openid profile email";

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}`;

    console.log("🔗 Redirecting to LinkedIn:", authUrl);
    window.location.href = authUrl;
  };

  return <button onClick={handleLinkedInLogin}>Login with LinkedIn</button>;
};

const MicrosoftLoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup()
      .then((response) => {
        console.log("✅ Microsoft Login Success:");
        console.log("Full Response:", response);
        console.log("Microsoft token:", response.idToken);
      })
      .catch((e) => {
        console.log("❌ Microsoft Login Failed");
        console.error(e);
      });
  };

  return <button onClick={handleLogin}>Login with Microsoft</button>;
};

const MainPage = () => {
  return (
    <div className="div">
      <h2>Login Providers</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("✅ Google Login Success:");
          const decoded = jwtDecode(credentialResponse.credential);
          console.log("Decoded Google JWT:", decoded);
        }}
        onError={() => {
          console.log("❌ Google Login Failed");
        }}
      />
      <LinkedInLogin />
      <MicrosoftLoginButton />
    </div>
  );
};

export default MainPage;
