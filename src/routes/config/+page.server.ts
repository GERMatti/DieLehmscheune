import type { PageServerLoad } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import {
  type Workshop,
  type WorkshopCategory,
  WorkshopService,
} from "$lib/services/WorkshopService";
import {
  formatDateFromWorkshop,
  sortArrayOfWorkshops,
} from "$lib/calendar/CalendarService";

export const load: PageServerLoad = async ({ locals }) => {
  ensureAdmin(locals);
  const workshopService = new WorkshopService(locals.dbconn);
  const workshops: Workshop[] = await workshopService.getAllWorkshops();
  const categories: WorkshopCategory[] = await workshopService
    .getAllCategories();
  sortArrayOfWorkshops(workshops);
  formatDateFromWorkshop(workshops);

  return { workshops, categories };
};
