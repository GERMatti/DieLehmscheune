import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";

import { render } from "svelte-email";
import Hello from "$lib/emails/Kontakt.svelte";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secureConnection: false,
  auth: {
    user: "vena68@ethereal.email",
    pass: "kARvVaSQWke7zBJ7BT",
  },
});

const schema = z.object({
  vorname: z.string().min(1, "Bitte geben Sie Ihren Vornamen ein."),
  nachname: z.string().min(1, "Bitte geben Sie Ihren Nachnamen ein."),
  email: z.string().email(),
  message: z.string().min(10, "Bitte geben Sie eine Nachricht ein."),
});

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(schema));
  return { form, message: null };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) {
      console.log("Form is not valid");
      return fail(400, { form });
    }
    console.log("Form is valid");
    return message(form, true);
  },
};
