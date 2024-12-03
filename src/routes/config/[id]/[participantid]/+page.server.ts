// src/routes/config/%5Bid%5D/+page.server.ts
import type { PageServerLoad, Actions } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import {error, fail} from "@sveltejs/kit";
import { WorkshopService, type Participant } from "$lib/services/WorkshopService";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";

const schema = z.object({
 participantid : z.number(),
 fullname: z.string(),
 email: z.string(),
 ischild: z.boolean(),
});

export const load: PageServerLoad = async ({ params, locals }) => {
 ensureAdmin(locals);
 const workshopService = new WorkshopService(locals.dbconn);
 const participant = await workshopService.getParticipantById(Number(params.participantid));

 if (!participant) {
  return fail(404);
 }

 const schemaDefault = z.object({
  participantid : z.number().default(participant.participantid),
  fullname: z.string().default(participant.fullname),
  email: z.string().default(participant.email),
  ischild: z.boolean().default(participant.ischild),
 });

 const form = await superValidate(zod(schemaDefault));

 return { form, message: null, workshopId: params.id };
};

export const actions: Actions = {
 default: async ({ request, locals }) => {
  const form = await superValidate(request, zod(schema));
  console.log(form);

  const workshopService = new WorkshopService(locals.dbconn);
  const participant = await workshopService.getParticipantById(form.data.participantid);
  console.log(participant);

  if (!participant) {
   return fail(404);
  }

  // Check for changes
  const hasChanges =
      form.data.fullname !== participant.fullname ||
      form.data.email !== participant.email ||
      form.data.ischild !== participant.ischild;

  if (hasChanges) {
   console.log("Changes detected");
   // Update the workshop in the database
   const statuscode = await workshopService.updateParticipant({
    ...participant,
    fullname: form.data.fullname,
    email: form.data.email,
    ischild: form.data.ischild,
   });
   if(statuscode !== 200) {
    return fail(statuscode);
   }
  }

  return { success: true };
 }
};