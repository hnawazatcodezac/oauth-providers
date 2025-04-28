import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import qs from "qs";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
const linkedinClientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const linkedinCallbackUrl = process.env.LINKEDIN_CALLBACK_URL;

app.post("/linkedin-exchange-token", async (req, res) => {
  const { code } = req.query;

  const data = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    client_id: linkedinClientId,
    client_secret: linkedinClientSecret,
    redirect_uri: linkedinCallbackUrl,
  });

  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return res.json(response.data);
  } catch (error) {
    return res
      .status(400)
      .json(error.response?.data || { message: "Error fetching access token" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
