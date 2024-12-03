import type { PageServerLoad } from "./$types";
import {ensureAdmin} from "$lib/server/auth";
import { WorkshopService } from "$lib/services/WorkshopService";
import {formatDateFromWorkshop, sortArrayOfWorkshops} from "$lib/calendar/CalendarService";

export const load: PageServerLoad = async ({ locals }) => {
 ensureAdmin(locals);
 const workshopService = new WorkshopService(locals.dbconn);
    const workshops = await workshopService.getAllWorkshops();
    sortArrayOfWorkshops(workshops);
    formatDateFromWorkshop(workshops);

    return { workshops };
}