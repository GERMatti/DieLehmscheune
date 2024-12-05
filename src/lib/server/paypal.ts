import { env } from "$env/dynamic/private";
import { PUBLIC_API_CLIENT_ID } from "$env/static/public";
import axios from "axios";

export let PRIVATE_ACCESS_TOKEN = "";

export async function refreshPayPalToken() {
  console.log("Refreshing PayPal token...");
  try {
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      new URLSearchParams({
        "grant_type": "client_credentials",
      }),
      {
        headers: {
          Accept: "application/json, text/plain, *!/!*",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic " +
            btoa(
              PUBLIC_API_CLIENT_ID + ":" + env.PRIVATE_API_CLIENT_SECRET,
            ),
        },
      },
    );
    console.log(response.data.access_token);
    PRIVATE_ACCESS_TOKEN = response.data.access_token;
    console.log("PayPal token refreshed:", response.data.access_token);
  } catch (error) {
    return Promise.reject(error);
  }
}
