import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { WorkshopService } from "$lib/services/WorkshopService";
import { PRIVATE_ACCESS_TOKEN, refreshPayPalToken } from "$lib/server/paypal";

async function createOrder() {
  const response = await fetch(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PRIVATE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        "purchase_units": [{
          "amount": {
            "currency_code": "EUR",
            "value": "77.27",
          },
        }],
        "intent": "CAPTURE",
        "payment_source": {
          "paypal": {
            "experience_context": {
              "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
              "payment_method_selected": "PAYPAL",
              "brand_name": "Die Lehmscheune",
              "locale": "de-DE",
              "landing_page": "LOGIN",
              "shipping_preference": "NO_SHIPPING",
              "user_action": "PAY_NOW",
              "return_url": "http://localhost:5173/success",
              "cancel_url": "http://localhost:5173/cancel",
            },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    if (response.status == 401) {
      await refreshPayPalToken();
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export const POST: RequestHandler = async ({ request, locals }) => {
  const { workshopID, isCheckboxChecked } = await request.json();
  if (!isCheckboxChecked) {
    return json({ error: "Please accept the terms and conditions" }, {
      status: 400,
    });
  }
  const workshopService = new WorkshopService(locals.dbconn);
  const remainingSlots: number | unknown = await workshopService
    .getRemainingAppointments(workshopID);
  if (remainingSlots == 0) {
    return json({ error: "No more slots available" }, { status: 400 });
  }
  const order = await createOrder();
  return json(order);
};
