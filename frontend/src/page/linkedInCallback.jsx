import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const LinkedInCallback = () => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !disabled) {
      setDisabled(true);

      const getAccessToken = async () => {
        const response = await fetch(
          `${backendBaseUrl}/linkedin-exchange-token?code=${code}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
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

      getAccessToken();
    }
  }, []);

  return <div>Processing LinkedIn login...</div>;
};

export default LinkedInCallback;
