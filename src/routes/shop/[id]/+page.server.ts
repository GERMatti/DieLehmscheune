import type { PageServerLoad } from "./$types";
import {type Workshop, WorkshopService} from "$lib/services/WorkshopService";
import {PaypalService} from "$lib/services/PaypalService";

export const load: PageServerLoad = async ({ params, locals }) => {
    const workshopService = new WorkshopService(locals.dbconn);
    const workshop: Workshop | undefined = await workshopService.getWorkshopById(Number(params.id));

    const price: number | unknown = await workshopService.getWorkshopPrice(workshop!.categoryid);
    const remainingSlots: number | unknown = await workshopService.getRemainingAppointments(workshop!.workshopid);

    return { workshop, price, remainingSlots };
};