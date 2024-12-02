import { json } from "@sveltejs/kit";
import { WorkshopService } from "$lib/services/WorkshopService";
import {
  formatDateFromWorkshop,
  generateCalendar,
  sortArrayOfWorkshops,
} from "$lib/calendar/CalendarService";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals }) => {
  const { MonthOffset } = await request.json();
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + MonthOffset);
  console.log(currentDate);
  console.log(MonthOffset);

  const calendarArr = generateCalendar(
    currentDate.getMonth() + 1,
    currentDate.getFullYear(),
  );

  const workshopService = new WorkshopService(locals.dbconn);
  const workshops = await workshopService.getAllWorkshops();

  sortArrayOfWorkshops(workshops);
  formatDateFromWorkshop(workshops);
  console.log({ calendarArr, workshops });

  return json({ calendarArr, workshops });
};
