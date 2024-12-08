import type { PageServerLoad } from "./$types";
import { type Workshop, WorkshopService } from "$lib/services/WorkshopService";
import {
  formatDateFromWorkshop,
  generateCalendar,
  sortArrayOfWorkshops,
} from "$lib/calendar/CalendarService";
import { generateColor } from '$lib/utils/colorUtils';

export const load: PageServerLoad = async ({ locals, url }) => {
  const monthOffset = parseInt(url.searchParams.get("monthOffset") || "0");
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + monthOffset);

  const calendarArr = generateCalendar(
    new Date().getMonth() + 1,
    new Date().getFullYear(),
  );

  const workshopService = new WorkshopService(locals.dbconn);
  const workshops: Workshop[] = await workshopService.getAllWorkshops();

  sortArrayOfWorkshops(workshops);
  formatDateFromWorkshop(workshops);

  workshops.forEach((workshop: Workshop, index:number) => {
    workshop.colorClass = `bg-${generateColor(index)}-500`;
  });


  return { calendarArr, workshops };
};
