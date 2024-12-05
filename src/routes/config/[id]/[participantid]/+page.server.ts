// src/routes/config/%5Bid%5D/+page.server.ts
import type { Actions, PageServerLoad } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import { error, fail, redirect } from "@sveltejs/kit";
import {
  type Participant,
  WorkshopService,
} from "$lib/services/WorkshopService";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

const schema = z.object({
  participantid: z.number().min(1),
  fullname: z.string().min(1).max(100),
  email: z.string().min(1).max(100),
  ischild: z.boolean(),
  workshopId: z.number().min(1),
});

export const load: PageServerLoad = async ({ params, locals }) => {
  ensureAdmin(locals);
  const workshopService = new WorkshopService(locals.dbconn);
  const participant = await workshopService.getParticipantById(
    Number(params.participantid),
  );

  if (!participant) {
    return fail(404);
  }
  console.log(participant);
  const schemaDefault = z.object({
    participantid: z.number().default(participant.participantid),
    fullname: z.string().default(participant.fullname),
    email: z.string().default(participant.email),
    ischild: z.boolean().default(participant.ischild),
    workshopId: z.number().default(Number(params.id)), // Security risk, but we trust the User, because he is an Admin
  });

  const form = await superValidate(zod(schemaDefault));

  return { form, message: null };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod(schema));
    if(!form.valid){
        return fail(400, {form});
    }

    const workshopService = new WorkshopService(locals.dbconn);
    const participant = await workshopService.getParticipantById(
      form.data.participantid,
    );
    console.log(participant);

    if (!participant) {
      return fail(404);
    }

    // Check for changes
    const hasChanges = form.data.fullname !== participant.fullname ||
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
      if (statuscode !== 200) {
        return fail(statuscode);
      }
    }

    redirect(300, `/config/${form.data.workshopId}`);
  },
};
