import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { WorkshopService } from "$lib/services/WorkshopService";
import { ensureAdmin } from "$lib/server/auth";
import {RegistrationService} from "$lib/services/RegistrationService";
import {ParticipantService} from "$lib/services/ParticipantService";

export const DELETE: RequestHandler = async ({ request, locals }) => {
  ensureAdmin(locals);
  const { participantid, workshopid } = await request.json();
  console.log(
    "Delete Participant with ID: " + participantid +
      " from Workshop with ID: " + workshopid,
  );

  const registrationService = new RegistrationService(locals.dbconn);
  const participantService = new ParticipantService(locals.dbconn);
  const slotCount = await registrationService.getSlotCount(
    participantid,
    workshopid,
  );
  if (slotCount === null) {
    return json({ status: 404 });
  }
  if (slotCount <= 1) {
    console.log("Delete Participant");
    const statusCode = await participantService.deleteParticipant(participantid);
    return json({ status: statusCode });
  } else {
    console.log("Decrease Slot");
    const statusCode = await registrationService.decreaseSlot(
      participantid,
      workshopid,
    );
    return json({ status: statusCode });
  }
};
