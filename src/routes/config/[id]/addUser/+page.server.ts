// src/routes/config/%5Bid%5D/+page.server.ts
import type { PageServerLoad, Actions } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import {error, fail, json, redirect} from "@sveltejs/kit";
import { WorkshopService, type Participant } from "$lib/services/WorkshopService";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {PaypalService} from "$lib/services/PaypalService";

const schema = z.object({
 fullname: z.string(),
 email: z.string().email(),
 workshopId: z.number(),
});

export const load: PageServerLoad = async ({ params, locals }) => {
 ensureAdmin(locals);
 const schemaDefault = z.object({
  fullname: z.string(),
  email: z.string().email(),
  workshopId: z.number().default(Number(params.id)), // Security risk, but we trust the User, because he is an Admin
 });

 const form = await superValidate(zod(schemaDefault));

 return { form, message: null };
};

export const actions: Actions = {
 default: async ({ request, locals }) => {
  const form = await superValidate(request, zod(schema));
  console.log(form);

  const paypalService = new PaypalService(locals.dbconn);
    const workshopService = new WorkshopService(locals.dbconn);
  const remainingSlots: number | unknown = await workshopService.getRemainingAppointments(form.data.workshopId);
  if (remainingSlots == 0) {
   return json({ error: "No more slots available" }, { status: 400 });
  }

   const participantId = await paypalService.findOrCreateParticipant(form.data.fullname, form.data.email);
   await paypalService.registerforWorkshop(form.data.workshopId, participantId);

  redirect(300, `/config/${form.data.workshopId}`);
 }
};