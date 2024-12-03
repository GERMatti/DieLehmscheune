import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { WorkshopService } from "$lib/services/WorkshopService";
import {ensureAdmin} from "$lib/server/auth";


export const DELETE: RequestHandler = async ({ request, locals }) => {
    ensureAdmin(locals);
    const { workshopid } = await request.json();
    console.log("Delete Workshop with ID: " + workshopid);

    const workshopService = new WorkshopService(locals.dbconn);
    const statusCode = await workshopService.deleteWorkshop(workshopid);
    return json({ status: statusCode });
}