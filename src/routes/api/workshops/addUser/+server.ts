import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { WorkshopService } from "$lib/services/WorkshopService";
import {ensureAdmin} from "$lib/server/auth";


export const DELETE: RequestHandler = async ({ request, locals }) => {
    ensureAdmin(locals);
    const { participantid, workshopid } = await request.json();
    console.log("Delete Participant with ID: " + participantid + " from Workshop with ID: " + workshopid);

    const workshopService = new WorkshopService(locals.dbconn);
    const slotCount = await workshopService.getSlotCount(participantid, workshopid);
    if(slotCount === null){
        return json({ status: 404 });
    }
    if (slotCount <= 1){
        console.log("Delete Participant");
        const statusCode = await workshopService.deleteParticipant(participantid);
        return json({ status: statusCode });
    } else{
        console.log("Decrease Slot");
        const statusCode = await workshopService.decreaseSlot(participantid, workshopid);
        return json({ status: statusCode });
    }
}