import type { PageServerLoad } from "./$types";
import { WorkshopService, type Workshop } from "$lib/services/WorkshopService";
import {
  formatDateFromWorkshop,
  generateCalendar,
  sortArrayOfWorkshops,
} from "$lib/calendar/CalendarService";

export const load: PageServerLoad = async ({ locals, url }) => {
  const monthOffset = parseInt(url.searchParams.get("monthOffset") || "0");
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + monthOffset);

  let calendarArr = generateCalendar(
    new Date().getMonth() + 1,
    new Date().getFullYear(),
  );

  const workshopService = new WorkshopService(locals.dbconn);
  const workshops: Workshop[] = await workshopService.getAllWorkshops();

  sortArrayOfWorkshops(workshops);
  formatDateFromWorkshop(workshops);

  return { calendarArr, workshops };
};
