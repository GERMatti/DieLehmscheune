import type { RequestHandler } from "./$types";
import { PRIVATE_ACCESS_TOKEN } from "$lib/server/paypal";
import { json } from "@sveltejs/kit";
import { PaypalService } from "$lib/services/PaypalService";

export interface Capture {
  id: string;
  status: string;
  payments: {
    captures: {
      amount: {
        value: string;
        currency_code: string;
      };
    }[];
  };
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
  };
}

async function captureOrder(orderID: string, accessToken: string) {
  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export const POST: RequestHandler = async ({ request, locals }) => {
  const accessToken = PRIVATE_ACCESS_TOKEN;
  const { orderID, workshopID } = await request.json();
  console.log(orderID, workshopID);
  const capture: Capture = await captureOrder(orderID, accessToken);

  console.log(capture);

  const paypalService = new PaypalService(locals.dbconn);
  const participantId = await paypalService.findOrCreateParticipant(
    capture.payer.email_address,
    `${capture.payer.name.given_name} ${capture.payer.name.surname}`,
  );
  console.log("ParticipentID:", participantId);
  await paypalService.writePaypalOrderToDB(capture, participantId);
  await paypalService.registerforWorkshop(workshopID, participantId);

  return json(capture);
};
