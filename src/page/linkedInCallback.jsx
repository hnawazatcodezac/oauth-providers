import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import qs from "qs";

const linkedinClientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const linkedinClientSecret = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;
const linkedinCallbackUrl = import.meta.env.VITE_LINKEDIN_CALLBACK_URL;

const LinkedInCallback = () => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !disabled) {
      setDisabled(true);
      console.log("Received code from LinkedIn:", code);

      const bodyData = qs.stringify({
        grant_type: "authorization_code",
        code: code,
        client_id: linkedinClientId,
        client_secret: linkedinClientSecret,
        redirect_uri: linkedinCallbackUrl,
      });
      const getAccessToken = async () => {
        const response = await fetch(
          "https://www.linkedin.com/oauth/v2/accessToken",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: bodyData,
            mode: "no-cors",
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Access Token Data:", data);
          const decoded = jwtDecode(data.id_token);
          console.log("decoded", decoded);
          setDisabled(false);
        } else {
          console.error("Error fetching access token:", data);
          setDisabled(false);
        }
      };

      // const getAccessToken = async () => {
      //   const response = await fetch(
      //     `http://localhost:3000/linkedin-exchange-token?code=${code}`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      //   const data = await response.json();

      //   if (response.ok) {
      //     console.log("Access Token Data:", data);
      //     const decoded = jwtDecode(data.id_token);
      //     console.log("decoded", decoded);
      //     setDisabled(false);
      //   } else {
      //     console.error("Error fetching access token:", data);
      //     setDisabled(false);
      //   }
      // };

      getAccessToken();
    }
  }, []);

  return <div>Processing LinkedIn login...</div>;
};

export default LinkedInCallback;
